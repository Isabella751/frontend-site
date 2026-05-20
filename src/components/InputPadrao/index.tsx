import styles from './style.module.css';
import type { InputHTMLAttributes } from "react";
/** Programaçao logica do type script */
//estender atributos padroes do HTML para o nosso input
interface InputPadraoProps extends InputHTMLAttributes<HTMLInputElement> {
    // customizar caso seja necessario no futuro 
    /**0 inputHtmlAttributes traz id, type, placeholde, value
    onChange, etc quando importado. nao precisa fica tipando*/
   
}
export function InputPadrao({ className, ...rest}: InputPadraoProps) {
    return (
        <input 
        /** junta a classe base do modulo css com qualquer 
        classe extra via props */
            className={`${styles.input} ${className || ''}`} {...rest} 
            /**espalha todas as outras propriedades (placeholder, id, 
            etc) no elemento
        */
        />
    );
}