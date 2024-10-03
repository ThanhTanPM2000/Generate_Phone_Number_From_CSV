import {
  Button, FormControl, FormErrorMessage, FormLabel, Input,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader,
  ModalOverlay,
  NumberInput, NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react';
import { UseMutateFunction } from '@tanstack/react-query';
import { Field, Form, useFormik } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const AddSpreadsheetSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  spreadsheetId: Yup.string().required("Required"),
  headerRowIndex: Yup.number().min(1, "Must be greater than 0").required("Required"),
  sheetName: Yup.string().optional(),
});

// Props interface
interface AddSpreadsheetProps {
  isCreating: boolean;
  isOpen: boolean;
  onClose: () => void;
  onCreate: UseMutateFunction<any, Error, { title: string; spreadsheetId: string; sheetName: string; headerRowIndex: number; }, unknown>;
}

const AddSpreadsheetModal: React.FC<AddSpreadsheetProps> = ({ isCreating, isOpen, onClose, onCreate }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      spreadsheetId: '',
      headerRowIndex: 1,
      sheetName: ''
    },
    validationSchema: AddSpreadsheetSchema,
    onSubmit: (values) => {
      onCreate(values);
      onClose();
    }
  });

  return (
    <Modal closeOnOverlayClick={false}
      onCloseComplete={() => {
        formik.resetForm()
      }}
      size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form>
          <ModalHeader>Add New Google Spreadsheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isInvalid={formik.touched.title && !!formik.errors.title}>
                <FormLabel htmlFor="title">Title:</FormLabel>
                <Input {...formik.getFieldProps('title')} />
                <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.spreadsheetId && !!formik.errors.spreadsheetId}>
                <FormLabel htmlFor="spreadsheetId">Spreadsheet Id:</FormLabel>
                <Input {...formik.getFieldProps('spreadsheetId')} />
                <FormErrorMessage>{formik.errors.spreadsheetId}</FormErrorMessage>
              </FormControl>
              <HStack>
                <FormControl isInvalid={formik.touched.sheetName && !!formik.errors.sheetName}>
                  <FormLabel htmlFor="sheetName">Sheet Name:</FormLabel>
                  <Input {...formik.getFieldProps('sheetName')} />
                  <FormErrorMessage>{formik.errors.sheetName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.touched.headerRowIndex && !!formik.errors.headerRowIndex}>
                  <FormLabel htmlFor="headerRowIndex">Header Row Index:</FormLabel>
                  <NumberInput
                    value={formik.values.headerRowIndex}
                    onChange={(value) => formik.setFieldValue('headerRowIndex', value)}
                    min={1}
                    max={20}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{formik.errors.headerRowIndex}</FormErrorMessage>
                </FormControl>
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button bg="primary" color="white" isLoading={isCreating} onClick={() => formik.submitForm()}>
                Add
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddSpreadsheetModal;
