import { calculateRoutesWithLocale, useRoutesWithLocale } from 'consts/Routes';
import { ReactNode, createContext, useContext } from 'react';

type RoutingContextType = ReturnType<typeof calculateRoutesWithLocale>;

const RoutingContext = createContext<RoutingContextType>(
  calculateRoutesWithLocale('en-Us')
);

export const useRoutes = () => {
  return useContext(RoutingContext);
};

export const RoutingProvider = ({
  children,
  RoutesWithLocale,
}: {
  children: ReactNode;
  RoutesWithLocale?: RoutingContextType;
}) => {
  const routesWithLocale = useRoutesWithLocale();
  return (
    <RoutingContext.Provider value={RoutesWithLocale || routesWithLocale}>
      {children}
    </RoutingContext.Provider>
  );
};
