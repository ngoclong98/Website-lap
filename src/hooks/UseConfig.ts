import { useEffect } from "react";
import { getConfig } from "src/api";
import Config from "src/models/Config";
import useLocalStorage from "./UseLocalStorage";

const useConfig = (): Config | null => {
  const [config, setConfig] = useLocalStorage("config", null);
  const _loadConfig = async () => {
    try {
      const configRes = await getConfig();
      console.log("configRes", configRes);
      setConfig(configRes.data);
    } catch (err) {
      console.log("Load config err", err);
    }
  };
  useEffect(() => {
    _loadConfig();
  }, []);
  return config;
};

export default useConfig;
