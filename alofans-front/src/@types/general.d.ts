// src/@types/global.d.ts
declare global {
  interface TypeDataActions {
    text: string;
    onPress: () => void;
    style?: React.CSSProperties;
  }

  interface TypeDataModal {
    title?: string;
    message?: string;
    titleStyle?: React.CSSProperties;
    messageStyle?: React.CSSProperties;
    buttons: TypeDataActions[];
    children?: React.ReactNode;
    fullWidth?: boolean;
    fullHeight?: boolean;
    imageUrl?: string; // Nova prop opcional para a imagem
    content?: string;
    onClose?: () => void;
  }
  interface TypeReturnRequest {
    status: number,
    data: any,
  }
}

// Para evitar que o TypeScript considere este arquivo como um módulo,
// você pode exportar algo vazio.
export { };
