import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Invoice } from '../types/invoice';
import { invoiceService } from '../services/api';

const validationSchema = Yup.object({
  client_type: Yup.string().required('Client type is required'),
  invoice_number: Yup.number().required('Invoice number is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  service_description: Yup.string().required('Service description is required'),
  address: Yup.string().required('Address is required'),
  month: Yup.string().required('Month is required'),
  price_per_hour: Yup.string().required('Price per hour is required'),
  total_price: Yup.string().required('Total price is required'),
  payment_condition: Yup.string().required('Payment condition is required'),
  due_date: Yup.string().required('Due date is required'),
  payment_method: Yup.string().required('Payment method is required'),
  account_number: Yup.string().required('Account number is required'),
  iban: Yup.string().required('IBAN is required'),
  net_amount: Yup.string().required('Net amount is required'),
  vat: Yup.string().required('VAT is required'),
  total_amount: Yup.string().required('Total amount is required'),
  nif: Yup.string().required('NIF is required'),
});

type FormValues = Omit<Invoice, 'invoice_number'> & {
  invoice_number: string;
  client_type: string;
};

const CreateInvoice = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      client_type: '',
      invoice_number: '',
      invoice_date: '',
      service_description: '',
      address: '',
      month: '',
      price_per_hour: '',
      total_price: '',
      payment_condition: '',
      due_date: '',
      payment_method: '',
      account_number: '',
      iban: '',
      net_amount: '',
      vat: '',
      total_amount: '',
      nif: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      
      try {
        await invoiceService.createInvoice({
          ...values,
          invoice_number: parseInt(values.invoice_number, 10),
        });
        setSuccess(true);
        formik.resetForm();
      } catch (error) {
        setError('Failed to create invoice. Please try again.');
        console.error('Error creating invoice:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ 
      mt: { xs: 2, sm: 4 }, 
      mb: { xs: 2, sm: 4 },
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        component="h1" 
        gutterBottom
        sx={{ textAlign: { xs: 'center', sm: 'left' } }}
      >
        Generar Factura
      </Typography>
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Factura creada correctamente!
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={isMobile ? 2 : 3}>
            <FormControl 
              fullWidth 
              error={formik.touched.client_type && Boolean(formik.errors.client_type)}
              size={isMobile ? "small" : "medium"}
            >
              <InputLabel id="client-type-label">Cliente</InputLabel>
              <Select
                labelId="client-type-label"
                id="client_type"
                name="client_type"
                value={formik.values.client_type}
                onChange={formik.handleChange}
                label="Cliente"
              >
                <MenuItem value="individual">Moscu #2</MenuItem>
                <MenuItem value="company">Moscu #4</MenuItem>
                <MenuItem value="freelancer">Moscu #6</MenuItem>
                <MenuItem value="freelancer">Ramon Trias Fargas #15</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="invoice_number"
              name="invoice_number"
              label="Número de Factura"
              value={formik.values.invoice_number}
              onChange={formik.handleChange}
              error={formik.touched.invoice_number && Boolean(formik.errors.invoice_number)}
              helperText={formik.touched.invoice_number && formik.errors.invoice_number}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="invoice_date"
              name="invoice_date"
              label="Fecha de Factura"
              type="date"
              value={formik.values.invoice_date}
              onChange={formik.handleChange}
              error={formik.touched.invoice_date && Boolean(formik.errors.invoice_date)}
              helperText={formik.touched.invoice_date && formik.errors.invoice_date}
              InputLabelProps={{ shrink: true }}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="service_description"
              name="service_description"
              label="Descripción del Servicio"
              multiline
              rows={isMobile ? 3 : 4}
              value={formik.values.service_description}
              onChange={formik.handleChange}
              error={formik.touched.service_description && Boolean(formik.errors.service_description)}
              helperText={formik.touched.service_description && formik.errors.service_description}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Dirección"
              multiline
              rows={isMobile ? 2 : 3}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              size={isMobile ? "small" : "medium"}
            />
            <FormControl 
              fullWidth 
              error={formik.touched.client_type && Boolean(formik.errors.client_type)}
              size={isMobile ? "small" : "medium"}
            >
              <InputLabel id="month-label">Mes</InputLabel>
              <Select
                labelId="month-label"
                id="month"
                name="month"
                value={formik.values.month}
                onChange={formik.handleChange}
                label="Mes"
              > 
                <MenuItem value="Enero">Enero</MenuItem>
                <MenuItem value="Febrero">Febrero</MenuItem>
                <MenuItem value="Marzo">Marzo</MenuItem>
                <MenuItem value="Abril">Abril</MenuItem>
                <MenuItem value="Mayo">Mayo</MenuItem>
                <MenuItem value="Junio">Junio</MenuItem>
                <MenuItem value="Julio">Julio</MenuItem>
                <MenuItem value="Agosto">Agosto</MenuItem>
                <MenuItem value="Septiembre">Septiembre</MenuItem>
                <MenuItem value="Octubre">Octubre</MenuItem>
                <MenuItem value="Noviembre">Noviembre</MenuItem>
                <MenuItem value="Diciembre">Diciembre</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="price_per_hour"
              name="price_per_hour"
              label="Precio por Hora"
              value={formik.values.price_per_hour}
              onChange={formik.handleChange}
              error={formik.touched.price_per_hour && Boolean(formik.errors.price_per_hour)}
              helperText={formik.touched.price_per_hour && formik.errors.price_per_hour}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="total_price"
              name="total_price"
              label="Precio Total"
              value={formik.values.total_price}
              onChange={formik.handleChange}
              error={formik.touched.total_price && Boolean(formik.errors.total_price)}
              helperText={formik.touched.total_price && formik.errors.total_price}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="payment_condition"
              name="payment_condition"
              label="Condición de Pago"
              value={formik.values.payment_condition}
              onChange={formik.handleChange}
              error={formik.touched.payment_condition && Boolean(formik.errors.payment_condition)}
              helperText={formik.touched.payment_condition && formik.errors.payment_condition}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="due_date"
              name="due_date"
              label="Fecha de Vencimiento"
              type="date"
              value={formik.values.due_date}
              onChange={formik.handleChange}
              error={formik.touched.due_date && Boolean(formik.errors.due_date)}
              helperText={formik.touched.due_date && formik.errors.due_date}
              InputLabelProps={{ shrink: true }}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="payment_method"
              name="payment_method"
              label="Método de Pago"
              value={formik.values.payment_method}
              onChange={formik.handleChange}
              error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
              helperText={formik.touched.payment_method && formik.errors.payment_method}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="account_number"
              name="account_number"
              label="Número de Cuenta"
              value={formik.values.account_number}
              onChange={formik.handleChange}
              error={formik.touched.account_number && Boolean(formik.errors.account_number)}
              helperText={formik.touched.account_number && formik.errors.account_number}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="iban"
              name="iban"
              label="IBAN"
              value={formik.values.iban}
              onChange={formik.handleChange}
              error={formik.touched.iban && Boolean(formik.errors.iban)}
              helperText={formik.touched.iban && formik.errors.iban}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="net_amount"
              name="net_amount"
              label="Importe Neto"
              value={formik.values.net_amount}
              onChange={formik.handleChange}
              error={formik.touched.net_amount && Boolean(formik.errors.net_amount)}
              helperText={formik.touched.net_amount && formik.errors.net_amount}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="vat"
              name="vat"
              label="IVA"
              value={formik.values.vat}
              onChange={formik.handleChange}
              error={formik.touched.vat && Boolean(formik.errors.vat)}
              helperText={formik.touched.vat && formik.errors.vat}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              id="total_amount"
              name="total_amount"
              label="Importe Total"
              value={formik.values.total_amount}
              onChange={formik.handleChange}
              error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
              helperText={formik.touched.total_amount && formik.errors.total_amount}
              size={isMobile ? "small" : "medium"}
            />
          </Stack>
          <Box sx={{ 
            mt: 3, 
            display: 'flex', 
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth={isMobile}
              size={isMobile ? "medium" : "large"}
            >
              {isSubmitting ? 'Generando...' : 'Generar Factura'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateInvoice; 