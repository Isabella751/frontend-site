/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./style.module.css";
import { Container } from "../components/Container";
import { InputPadrao } from "../components/InputPadrao";
import { Pencil, X } from "lucide-react";
/* fazendo contrato dos recursos*/

export interface Curso {
    id: string; // O ID será gerado pelo backend
    nome: string;
    periodo: string;
}

interface ListaCursosProps {
  cursos: Curso[];
  aoEditar: (curso: Curso) => void;
  aoExcluir: (id: string) => void;
}

export function ListaCursos({ cursos, aoEditar, aoExcluir }: ListaCursosProps) {
  return (
    <>
      <Container>
        <section className={styles.listaContainer}>
          <h2 className={styles.titulo}>Lista de Cursos</h2>
          <div className={styles.buscaContainer}>
            <InputPadrao type="text" placeholder="Buscar curso..." />
          </div>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Período</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id}>
                    <td>{curso.nome}</td>
                    <td>{curso.periodo}</td>
                    <td>
                        <button className={styles.actionButton} title="Editar" onClick={() => aoEditar(curso)}>
                            <span><Pencil size={18} /></span>
                        </button>
                        <button className={styles.actionButton} title="Excluir" onClick={() => aoExcluir(curso.id)}>
                            <span><X size={18} /></span>
                        </button>
                    </td>
                    </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Container>
    </>
  );
}
