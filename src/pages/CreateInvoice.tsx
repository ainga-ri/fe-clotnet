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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { invoiceService } from '../services/api';

// Placeholder data for clients
const clientData = {
  'moscu2': {
    displayed_title: 'Moscu #2',
    client: 'COMUNIDAD DE PROPIETARIOS',
    street: 'NOVA ICARIA #231\nRAMPA PARKING MOSCU #532',
    zip_code_city: '08005 - BARCELONA',
    cif: 'H - 65522427',
    description: 'SERVICIO DE LIMPIEZA Y MANTENIMIENTO DEL PÁRKING',
    description_street: "CALLE MOSCÚ Nº 2, BARCELONA",
    total_price_description: 190.10,
    net_price: 150.00,
    vat21: 31.50,
    total_price: 181.50,
    condition: 'CONTADO',
    payment_method: "TRANSFERENCIA",
    account_number: 'ES91 XXXX XXXX XXXX XXXX XXXX',
    iban: 'ES31',
  },
};

const validationSchema = Yup.object({
  client_info: Yup.object({
    displayed_title: Yup.string().required('Displayed title is required'),
    client: Yup.string().required('Client is required'),
    street: Yup.string().required('Street is required'),
    zip_code_city: Yup.string().required('Zip code city is required'),
    cif: Yup.string().required('CIF is required'),
    description: Yup.string().required('Description is required'),
    description_street: Yup.string().required('Description street is required'),
    total_price_description: Yup.string().required('Total price description is required'),
    net_price: Yup.string().required('Net price is required'),
    vat21: Yup.string().required('VAT 21 is required'),
    total_price: Yup.string().required('Total price is required'),
    condition: Yup.string().required('Condition is required'),
    payment_method: Yup.string().required('Payment method is required'),
    account_number: Yup.string().required('Account number is required'),
    iban: Yup.string().required('IBAN is required')
  }),
  number: Yup.string().required('Invoice number is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  month: Yup.string().required('Month is required'),
  deadline: Yup.string().required('Deadline is required')
});

type FormValues = {
  client_info: {
    displayed_title: string;
    client: string;
    street: string;
    zip_code_city: string;
    cif: string;
    description: string;
    description_street: string;
    total_price_description: string;
    net_price: string;
    vat21: string;
    total_price: string;
    condition: string;
    payment_method: string;
    account_number: string;
    iban: string;
  },
  number: number;
  invoice_date: string;
  month: string;
  deadline: string;
};

const CreateInvoice = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      client_info: {
        displayed_title: '',
        client: '',
        street: '',
        zip_code_city: '',
        cif: '',
        description: '',
        description_street: '',
        total_price_description: '',
        net_price: '',
        vat21: '',
        total_price: '',
        condition: '',
        payment_method: '',
        account_number: '',
        iban: '',
      },
      number: 0,
      invoice_date: '',
      month: '',
      deadline: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      
      try {
        await invoiceService.createInvoice({
          ...values,
          number: values.number,
          invoice_date: values.invoice_date,
          month: values.month,
          deadline: values.deadline,
          client_info: {
            displayed_title: values.client_info.displayed_title,
            client: values.client_info.client,
            street: values.client_info.street,
            zip_code_city: values.client_info.zip_code_city,
            cif: values.client_info.cif,
            description: values.client_info.description,
            description_street: values.client_info.description_street,
            total_price_description: values.client_info.total_price_description,
            net_price: values.client_info.net_price,
            vat21: values.client_info.vat21,
            total_price: values.client_info.total_price,
            condition: values.client_info.condition,
            payment_method: values.client_info.payment_method,
            account_number: values.client_info.account_number,
            iban: values.client_info.iban
          }
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

  const handleClientChange = (event: any) => {
    const clientType = event.target.value;
    
    // When API is implemented, this will be replaced with an API call
    const clientInfo = clientData[clientType as keyof typeof clientData];
    if (clientInfo) {
      // Set all client_info values at once
      formik.setFieldValue('client_info', {
        displayed_title: clientInfo.displayed_title,
        client: clientInfo.client,
        street: clientInfo.street,
        zip_code_city: clientInfo.zip_code_city,
        cif: clientInfo.cif,
        description: clientInfo.description,
        description_street: clientInfo.description_street,
        total_price_description: clientInfo.total_price_description.toString(),
        net_price: clientInfo.net_price.toString(),
        vat21: clientInfo.vat21.toString(),
        total_price: clientInfo.total_price.toString(),
        condition: clientInfo.condition,
        payment_method: clientInfo.payment_method,
        account_number: clientInfo.account_number,
        iban: clientInfo.iban
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
                error={formik.touched.client_info && Boolean(formik.errors.client_info)}
                size={isMobile ? "small" : "medium"}
              >
                <InputLabel id="displayed_title-type-label">Titulo del Cliente</InputLabel>
                <Select
                  labelId="displayed_title-type-label"
                  id="displayed_title"
                  name="displayed_title"
                  value={formik.values.client_info.displayed_title}
                  onChange={handleClientChange}
                  label="Titulo del Cliente"
                >
                  <MenuItem value="moscu2">Moscu #2</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="number"
                name="number"
                label="Número de Factura"
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
                size={isMobile ? "small" : "medium"}
              />
              <DatePicker
                label="Fecha de Factura"
                value={formik.values.invoice_date ? dayjs(formik.values.invoice_date, 'DD/MM/YYYY') : null}
                onChange={(newValue) => {
                  if (newValue) {
                    formik.setFieldValue('invoice_date', newValue.format('DD/MM/YYYY'));
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.invoice_date && Boolean(formik.errors.invoice_date),
                    helperText: formik.touched.invoice_date && formik.errors.invoice_date,
                    size: isMobile ? "small" : "medium",
                  }
                }}
              />
              <TextField
                fullWidth
                id="description"
                name="client_info.description"
                label="Descripción del Servicio"
                multiline
                rows={isMobile ? 3 : 4}
                value={formik.values.client_info.description}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.description && Boolean(formik.errors.client_info?.description)}   
                helperText={formik.touched.client_info?.description && formik.errors.client_info?.description}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="address"
                name="client_info.street"
                label="Dirección"
                multiline
                rows={isMobile ? 2 : 3}
                value={formik.values.client_info.street}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.street && Boolean(formik.errors.client_info?.street)}
                helperText={formik.touched.client_info?.street && formik.errors.client_info?.street}
                size={isMobile ? "small" : "medium"}
              />
              <FormControl 
                fullWidth 
                error={formik.touched.month && Boolean(formik.errors.month)}
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
                id="total_price"
                name="client_info.total_price"
                label="Precio Total"
                value={formik.values.client_info.total_price}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.total_price && Boolean(formik.errors.client_info?.total_price)}
                helperText={formik.touched.client_info?.total_price && formik.errors.client_info?.total_price}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="condition"
                name="client_info.condition"
                label="Condición de Pago"
                value={formik.values.client_info.condition}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.condition && Boolean(formik.errors.client_info?.condition)}
                helperText={formik.touched.client_info?.condition && formik.errors.client_info?.condition}
                size={isMobile ? "small" : "medium"}
              />
              <DatePicker
                label="Fecha de Vencimiento"
                value={formik.values.deadline ? dayjs(formik.values.deadline, 'DD/MM/YYYY') : null}
                onChange={(newValue) => {
                  if (newValue) {
                    formik.setFieldValue('deadline', newValue.format('DD/MM/YYYY'));
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.deadline && Boolean(formik.errors.deadline),
                    helperText: formik.touched.deadline && formik.errors.deadline,
                    size: isMobile ? "small" : "medium"
                  }
                }}
              />
              <TextField
                fullWidth
                id="payment_method"
                name="client_info.payment_method"
                label="Método de Pago"
                value={formik.values.client_info.payment_method}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.payment_method && Boolean(formik.errors.client_info?.payment_method)}
                helperText={formik.touched.client_info?.payment_method && formik.errors.client_info?.payment_method}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="account_number"
                name="client_info.account_number"
                label="Número de Cuenta"
                value={formik.values.client_info.account_number}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.account_number && Boolean(formik.errors.client_info?.account_number)}
                helperText={formik.touched.client_info?.account_number && formik.errors.client_info?.account_number}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="iban"
                name="client_info.iban"
                label="IBAN"
                value={formik.values.client_info.iban}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.iban && Boolean(formik.errors.client_info?.iban)}
                helperText={formik.touched.client_info?.iban && formik.errors.client_info?.iban}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="net_price"
                name="client_info.net_price"
                label="Importe Neto"
                value={formik.values.client_info.net_price}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.net_price && Boolean(formik.errors.client_info?.net_price)}
                helperText={formik.touched.client_info?.net_price && formik.errors.client_info?.net_price}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="vat21"
                name="client_info.vat21"
                label="IVA"
                value={formik.values.client_info.vat21}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.vat21 && Boolean(formik.errors.client_info?.vat21)}
                helperText={formik.touched.client_info?.vat21 && formik.errors.client_info?.vat21}
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                fullWidth
                id="total_price"
                name="client_info.total_price"
                label="Importe Total"
                value={formik.values.client_info.total_price}
                onChange={formik.handleChange}
                error={formik.touched.client_info?.total_price && Boolean(formik.errors.client_info?.total_price)}
                helperText={formik.touched.client_info?.total_price && formik.errors.client_info?.total_price}
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
    </LocalizationProvider>
  );
};

export default CreateInvoice; 