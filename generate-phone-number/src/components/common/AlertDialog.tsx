import { useRef } from 'react';
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

interface Props {
  title?: string;
  body?: string;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  children?: (onOpen: () => void) => JSX.Element;
}

export default function AlertDialogComponent({
  onConfirm,
  title = 'Alert',
  body = 'Are you sure?',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  children,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = async () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader bgColor="primary.500" fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
            <AlertDialogBody>{body}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelButtonText}
              </Button>
              <Button colorScheme="primary" onClick={handleConfirm} ml={3}>
                {confirmButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {children && children(onOpen)}
    </>
  );
}
