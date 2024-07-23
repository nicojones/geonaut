"use client";

import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { FormControl, FormHelperText, FormLabel, Input, Option, Select, useColorScheme } from "@mui/joy";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

import { SelectableCard } from "@/components/generic";
import { useJwtTokenContext } from "@/context";
import { createZodErrorObject, raiseOnError, schemeFromTheme } from "@/functions";
import { ISettings, IThemeType, PDefault, ZodErrorMapping } from "@/types";
import { SettingsValidator } from "@/validators";

import { SettingsFormProfilePic } from "./SettingsFormProfilePic";
import { SettingsFormSave } from "./SettingsFormSave";

interface SettingsFormProps {
  settings: ISettings;
}

export const SettingsForm = ({ settings: initialSettings }: SettingsFormProps): JSX.Element => {
  const { api, setJwt } = useJwtTokenContext();

  const [settings, setSettings] = useState<ISettings>(initialSettings);
  const [errors, setErrors] = useState<ZodErrorMapping<ISettings>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const hasErrors = (Object.keys(errors).length > 0);

  const handleChange = (field: keyof ISettings): ((v: ChangeEvent<HTMLInputElement>) => any) =>
    value => setSettings(s => ({ ...s, [field]: value.target.value }));

  const handleSetTheme = (theme: IThemeType): void => {
    setSettings(s => ({ ...s, theme }));
  };

  const handleSettingsSave = useCallback((event: PDefault) => {
    event.preventDefault();
    setLoading(true);

    api<{ token: string; }, ISettings>({
      method: "POST",
      body: settings,
      url: "/api/settings/save",
    })
      .then(raiseOnError)
      .then(r => {
        toast(r.message);
        setJwt(r.token);
      })
      .catch(e => {
        toast.error(e.message);
      })
      .finally(() => setLoading(false));
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

      <FormControl
        error={!!errors.short_desc}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>summary</FormLabel>
        <Input
          value={settings.short_desc}
          onChange={handleChange("short_desc")}
        />
        {errors.short_desc && <FormHelperText>{errors.short_desc}</FormHelperText>}
      </FormControl>

      <FormControl
        error={!!errors.gender}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>pronouns</FormLabel>
        <Select
          name="gender"
          value={settings.gender}
          onChange={(_evt, value) => setSettings(_s => ({ ..._s, gender: value ?? 0 }))}
        >
          <Option value={0}>neutral (they / them / their)</Option>
          <Option value={1}>male (he / him / his)</Option>
          <Option value={2}>female (she / her / hers)</Option>
        </Select>
        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
      </FormControl>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">

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

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
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

      <SettingsFormProfilePic
        value={settings.profile_pic}
        onChange={p => setSettings(_s => ({ ..._s, profile_pic: p }))}
      />

      <SettingsFormSave
        disabled={hasErrors}
        loading={loading}
      />
    </form>
  );
};
