import type { Config } from "@react-router/dev/config";
import { truncate } from "fs/promises";

export default {
  ssr: true,
} satisfies Config;
