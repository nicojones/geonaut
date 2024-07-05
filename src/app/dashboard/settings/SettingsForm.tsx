"use client";

import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import Image from "next/image";
import { ChangeEvent, useCallback, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

import { SelectableCard } from "@/components/generic";
import { useJwtTokenContext } from "@/context";
import { createZodErrorObject } from "@/functions";
import { IResponseData, ISettings, PDefault, ZodErrorMapping } from "@/types";
import { SettingsValidator } from "@/validators";

interface SettingsFormProps {
  settings: ISettings;
}

export const SettingsForm = ({ settings: initialSettings }: SettingsFormProps): JSX.Element => {
  const { api, setJwt } = useJwtTokenContext();

  const [settings, setSettings] = useState<ISettings>(initialSettings);
  const [errors, setErrors] = useState<ZodErrorMapping<ISettings>>({});
  const hasErrors = (Object.keys(errors).length > 0);

  const handleChange = (field: keyof ISettings): ((v: ChangeEvent<HTMLInputElement>) => any) =>
    value => setSettings(s => ({ ...s, [field]: value.target.value }));

  const handleSettingsSave = useCallback((event: PDefault) => {
    event.preventDefault();

    api<IResponseData<{ token: string; }>, ISettings>({
      method: "POST",
      body: settings,
      url: "/ajax/settings/save",
    })
      .then(r => {
        toast(r.message);
        setJwt(r.token);
      })
      .catch(e => {
        toast.error(e.message);
      });
  }, [api, settings, setJwt]);

  useLayoutEffect(() => {
    SettingsValidator.safeParseAsync(settings)
      .then(f => {
        if (f.success) {
          setErrors({});
        } else {
          setErrors(createZodErrorObject<ISettings>(f.error.issues));
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, [settings]);

  return (
    <form onSubmit={handleSettingsSave} className="flex flex-col space-y-4">
      <FormControl error={!!errors.name}>
        <FormLabel>full name</FormLabel>
        <Input
          value={settings.name}
          onChange={handleChange("name")}
          startDecorator={<UserIcon className="size-3" />}
        />
        {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
        <FormHelperText>enter your full name as you&apos;d like people to see it</FormHelperText>
      </FormControl>

      <FormControl error={!!errors.username}>
        <FormLabel>username</FormLabel>
        <Input
          value={settings.username}
          onChange={handleChange("username")}
          startDecorator="@"
        />
        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
        <FormHelperText>this will be your username, @handle, and in the URL</FormHelperText>
      </FormControl>

      <FormControl error={!!errors.email}>
        <FormLabel>email</FormLabel>
        <Input
          value={settings.email}
          onChange={handleChange("email")}
          type="email"
          startDecorator={<EnvelopeIcon className="size-3" />}
        />

        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
        <FormHelperText><i>nobody</i>&nbsp;can see this</FormHelperText>
      </FormControl>

      <div className="fric space-x-4">

        <FormControl error={!!errors.password} className="grow">
          <FormLabel>password</FormLabel>
          <Input
            value={settings.password ?? ""}
            onChange={handleChange("password")}
            startDecorator={<KeyIcon className="size-3" />}
            type="password"
            placeholder="********"
          />
          {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
          <FormHelperText>(if you want to change it)</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.confirm} className="grow">
          <FormLabel>confirm password</FormLabel>
          <Input
            value={settings.confirm ?? ""}
            onChange={handleChange("confirm")}
            startDecorator={<KeyIcon className="size-3" />}
            type="password"
            placeholder="********"
          />
          {errors.confirm && <FormHelperText>{errors.confirm}</FormHelperText>}
          <FormHelperText>{settings.password ? "please confirm the password" : "(if you want to change it)"}</FormHelperText>
        </FormControl>
      </div>

      <div className="fric space-x-4">
        <SelectableCard
          onClick={() => setSettings(s => ({ ...s, bell_position: "menu" }))}
          selected={settings.bell_position === "menu"}
        >
          <Image src="/images/icons/generic/bell-menu.png" alt="Notification bell in the menu" width={250} height={250} />
        </SelectableCard>

        <SelectableCard
          onClick={() => setSettings(s => ({ ...s, bell_position: "top" }))}
          selected={settings.bell_position === "top"}
        >
          <Image src="/images/icons/generic/bell-top.png" alt="Notification bell in the top header" width={250} height={250} />
        </SelectableCard>
      </div>

      <hr />
      <p>(coming soon)</p>
      <div className="fric space-x-4">
        <SelectableCard
          onClick={() => setSettings(s => ({ ...s, theme: 1 }))}
          selected={settings.theme === 1}
        >
          <Image src="/images/icons/generic/theme-light.png" alt="Light theme" width={250} height={250} />
        </SelectableCard>

        <SelectableCard
          onClick={() => setSettings(s => ({ ...s, theme: 2 }))}
          selected={settings.theme === 2}
        >
          <Image src="/images/icons/generic/theme-dark.png" alt="Dark Theme" width={250} height={250} />
        </SelectableCard>
      </div>

      <Button
        className="w-full"
        size="lg"
        type="submit"
        color={hasErrors ? "danger" : undefined}
        disabled={hasErrors}
      >
        Save settings
      </Button>
    </form>
  );
};
