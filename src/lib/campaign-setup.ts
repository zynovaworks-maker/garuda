import { electionTypes, packages, strategies } from "@/lib/mock-data";

export type CampaignSetup = {
  nama: string;
  kandidat: string;
  tahun: string;
  election: string;
  pkg: string;
  strategy: string;
  logo?: string;
};

export const defaultCampaignSetup: CampaignSetup = {
  nama: "Kampanye Suryanto 2026",
  kandidat: "Ir. H. Suryanto, M.M.",
  tahun: "2026",
  election: "pilkada",
  pkg: "GARUDA Professional",
  strategy: "hybrid",
};

export const campaignSetupKey = "garuda_campaign_setup";

export function getCampaignSetup(): CampaignSetup {
  if (typeof window === "undefined") return defaultCampaignSetup;

  try {
    const raw = localStorage.getItem(campaignSetupKey);
    if (!raw) return defaultCampaignSetup;
    return { ...defaultCampaignSetup, ...JSON.parse(raw) };
  } catch {
    return defaultCampaignSetup;
  }
}

export function saveCampaignSetup(setup: CampaignSetup) {
  localStorage.setItem(campaignSetupKey, JSON.stringify(setup));
  window.dispatchEvent(new CustomEvent("garuda:campaign-setup", { detail: setup }));
}

export function getElectionMeta(code: string) {
  return electionTypes.find((item) => item.kode === code) ?? electionTypes.find((item) => item.kode === defaultCampaignSetup.election)!;
}

export function getPackageMeta(name: string) {
  return packages.find((item) => item.nama === name) ?? packages.find((item) => item.nama === defaultCampaignSetup.pkg)!;
}

export function getStrategyMeta(code: string) {
  return strategies.find((item) => item.kode === code) ?? strategies.find((item) => item.kode === defaultCampaignSetup.strategy)!;
}
