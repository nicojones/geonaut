import { Button } from "@mui/joy";

interface SettingsFormSaveProps {
  /**
   * @default false
   */
  disabled?: boolean;
  /**
   * @default false
   */
  loading?: boolean;
}

export const SettingsFormSave = ({ disabled = false, loading = false }: SettingsFormSaveProps): JSX.Element => {
  return (
    <Button
      type="submit"
      variant="solid"
      size="lg"
      className="w-full"
      disabled={disabled}
      loading={loading}
    >
      save
    </Button>
  );
};
