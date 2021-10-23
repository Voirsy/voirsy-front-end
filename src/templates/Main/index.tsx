import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => <SnackbarProvider>{children}</SnackbarProvider>;

export default Main;
