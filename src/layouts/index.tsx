import { useEffect } from "react";
import { useNavigate, Outlet } from "umi";

import { usePathname, useRoute } from "./hooks";

export default function Layout() {
  const navigate = useNavigate();
  const pathname = usePathname();
  const route = useRoute();

  useEffect(() => {
    if (pathname === "/") {
      navigate(route?.routes?.[0].path || "");
    }
  }, []);

  return <Outlet />;
}
