import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Text,
  Input,
  ResponsiveValue,
  FormLabel,
  Image,
  Flex,
} from '@chakra-ui/react';
import { ERROR_MESSAGES, IMAGES, REGEX } from '@/lib/constants';
import { uploadImage } from '@/lib/services';

export type TUploadImageProductsProps = {
  label: string;
  onUploadError: (message: string) => void;
  onChange: (value: string[]) => void;
};

const UploadProducts = ({
  label,
  onChange,
  onUploadError,
}: TUploadImageProductsProps) => {
  const [previewURL, setPreviewURL] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imagesPreview: React.SetStateAction<string[]> = [];
      const imagesUpload: string[] = [];

      if (acceptedFiles.length > 5) {
        return onUploadError(ERROR_MESSAGES.UPLOAD_IMAGE_ITEM);
      }

      acceptedFiles.map(async (file) => {
        if (!file) {
          return;
        }

        // Check type of image
        if (!REGEX.IMG.test(file.name)) {
          return onUploadError(ERROR_MESSAGES.UPLOAD_IMAGE);
        }

        // Uploading file
        try {
          onChange([]);
          const previewImage: string = URL.createObjectURL(file);
          const formData = new FormData();

          formData.append('image', file);
          imagesPreview.push(previewImage);

          const result = await uploadImage(formData);
          imagesUpload.push(result);
        } catch (error) {
          onUploadError(ERROR_MESSAGES.UPDATE_FAIL.title);
        }
        setPreviewURL(imagesPreview);
      });

      onChange(imagesUpload);
    },
    [onChange, onUploadError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex w="100%" flexDirection="column">
      <FormLabel
        htmlFor="file"
        cursor="pointer"
        color="text.secondary"
        marginInlineEnd={0}
        minW="max-content"
      >
        {label}
        <Flex mt="20px" flexDirection="column" alignItems="center" gap={3}>
          <Flex alignItems="center" gap={3}>
            {previewURL
              .slice(0, 3)
              ?.map((v) => (
                <Image
                  key={v}
                  w={{ base: 100, md: 150 }}
                  h={{ base: 100, md: 150 }}
                  src={v}
                  alt={IMAGES.AVATAR_SIGN_UP.alt}
                  fallbackSrc={IMAGES.USER.url}
                />
              ))}
          </Flex>
          <Flex alignItems="center" gap={3}>
            {previewURL
              .slice(3, 5)
              ?.map((v) => (
                <Image
                  key={v}
                  w={{ base: 100, md: 150 }}
                  h={{ base: 100, md: 150 }}
                  src={v}
                  alt={IMAGES.AVATAR_SIGN_UP.alt}
                  fallbackSrc={IMAGES.USER.url}
                />
              ))}
          </Flex>
        </Flex>
      </FormLabel>
      <Box
        {...getRootProps()}
        border="2px"
        borderColor={isDragActive ? 'green.500' : 'gray.200'}
        borderRadius="md"
        p={4}
        textAlign="center"
        cursor="pointer"
        _hover={{ borderColor: 'green.500' }}
      >
        <Input
          {...getInputProps()}
          size={undefined as ResponsiveValue<string> | undefined}
        />
        {isDragActive ? (
          <Text>Drop the files here ...</Text>
        ) : (
          <Text>Drag drop some files here, or click to select files</Text>
        )}
      </Box>
    </Flex>
  );
};

export default UploadProducts;
