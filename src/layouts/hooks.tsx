import { useLocation, useAppData } from "umi";

export function usePathname() {
  return useLocation().pathname;
}

export function useRoute() {
  const { clientRoutes } = useAppData();
  const [route] = clientRoutes;

  return route;
}
