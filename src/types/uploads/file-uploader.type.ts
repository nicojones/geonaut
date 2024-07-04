import { ALLOWED_CUSTOM_DATA_FILE_FORMATS } from "@/config";
import { ComponentChildren } from "@/types";

export interface IFileUploaderFileProps {

  /**
   * A record <mime, extension> of the supported types.
  */
  acceptTypes?: Record<string, string>;

  /**
   * A placeholder for the file selector
   * @optional
   * @default string see component for details
   */
  noFilesAddedPlaceholder?: string;
  /**
   * A placeholder when there's at least one file added and multiple
   * files are allowed.
   * @optional
   */
  multipleFilesPlaceholder?: string;

  /**
   * True when the files are uploading. This will disable the area and show a loader
   * @optional
   * @default false
   */
  isUploading?: boolean;
}

export interface IFileUploaderProps extends IFileUploaderFileProps {

  /**
   * Allows multiple files to be selected at once
   * @optional
   * @default true
   */
  allowMultiple?: boolean;

  /**
   * Set to true to disable the uploader
   * @optional
   * @default false
   */
  disabled?: boolean;

  /**
   * Triggered when we change the files in the input.
   */
  onFileAdded: (file: FileList) => any;

  /**
   * Children of the component, if any
   */
  children?: ComponentChildren;

  /**
   * Class names
   * @optional
   */
  className?: string;
}

export interface IFile {
  id: string;
  file_name: string;
  file_mime: FileMimeTypes;
  data_type: string;
  added_on: string;
  file_size: number;
}

export type FileMimeTypes = keyof typeof ALLOWED_CUSTOM_DATA_FILE_FORMATS;

export type FileExtensionTypes = typeof ALLOWED_CUSTOM_DATA_FILE_FORMATS[FileMimeTypes];
