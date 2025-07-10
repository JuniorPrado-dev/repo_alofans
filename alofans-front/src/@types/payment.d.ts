// src/@types/global.d.ts
declare global {
    interface TypeCharge {
        product_id: string ;
        status: string ; // Código do pix
        pix_code: string ; // Código do pix
        pix_qr_code: string ; // URL da imagem do QR Code do pix
    }
    interface TypePayment {
        type?: string |null;
        charge?:TypeCharge | null;
    }
    interface TypeWallet {
        cpf_cnpj: string,
        pix_key: string,
        balance: number,
    }
}

// Para evitar que o TypeScript considere este arquivo como um módulo,
// você pode exportar algo vazio.
export { };
