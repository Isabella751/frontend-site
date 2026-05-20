import { Container } from "../components/Container";
import { InputPadrao } from "../components/InputPadrao";
import { BotaoPadrao } from "../components/BotaoPadrao";
import Styles from "./style.module.css";
import { useState,useEffect} from "react";

interface dadosCurso {
    nomecurso: string;
    periodo: string;
}

interface MainFormProps {
    aoAdicionar: (curso:any) => void;
    aoAtualizar: (curso:any) => void;
    cursoEmEdicao: (any|null);
}


export function MainForm({ aoAdicionar, aoAtualizar, cursoEmEdicao }: MainFormProps) {
    const [dadosCurso, setDadosCurso] = useState<dadosCurso>({nomecurso: '', periodo: ''});
    useEffect(() => {   
        if (cursoEmEdicao) {
            setDadosCurso({
                nomecurso: cursoEmEdicao.nome,
                periodo: cursoEmEdicao.periodo
            });
        }
        else {
            setDadosCurso({
                nomecurso: '',
                periodo: ''
            });
        }   
    }, [cursoEmEdicao]);

    const lidarComMudanca = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDadosCurso({
            ...dadosCurso,
            [e.target.name]: e.target.value
        });
    };

    const cadastrarCurso = (e: any) => {
        e.preventDefault();
        if (cursoEmEdicao) {
            const cursoAtualizado = {
                id: cursoEmEdicao.id,
                nome: dadosCurso.nomecurso,
                periodo: dadosCurso.periodo
            };
            console.log("Alteração em Formato JSON:\n", JSON.stringify(cursoAtualizado, null, 2));
            aoAtualizar(cursoAtualizado);
        } else {
            const cursoNovo = {
                id: "",
                nome: dadosCurso.nomecurso,
                periodo: dadosCurso.periodo
            }
            console.log("Inclusão em Formato JSON:\n", JSON.stringify(cursoNovo, null, 2));
            aoAdicionar(cursoNovo);
        }
        setDadosCurso({ nomecurso: '', periodo: '' });
    }


    return (
        <Container >
            <section className={Styles.formularioContainer}>
                <h2 className={Styles.titulo}>
                    {cursoEmEdicao ? "Editar Curso" : "Cadastrar Curso"}
                </h2>
                <form onSubmit={cadastrarCurso}>
                    <div className={Styles.pularlinha}>
                        <label htmlFor="nomecurso" className={Styles.label}>
                            Nome Curso
                        </label>
                        <InputPadrao
                        type="text"
                        id="nomecurso"
                        name="nomecurso"
                        placeholder="Digite o nome do curso"
                        value={dadosCurso.nomecurso}
                        onChange={lidarComMudanca}
                        required
                        ></InputPadrao>
                    </div>
                    <div className={Styles.pularlinha}>
                        <label htmlFor="periodo" className={Styles.label}>Periodo</label>
                        <select 
                        name="periodo" 
                        id="periodo"
                        value={dadosCurso.periodo}
                        onChange={lidarComMudanca}
                        required
                        className={Styles.estiloSelect}
                        >
                            <option value="">Selecione o período</option>
                            <option value="matutino">Matutino</option>
                            <option value="vespertino">Vespertino</option>
                            <option value="noturno">Noturno</option>
                            <option value="integral">Integral</option>
                        </select>
                    </div>
                    <div className={Styles.alinharBotao}>
                        <BotaoPadrao type="submit">
                            {cursoEmEdicao ? "Salvar Alteração" : "Inserir Curso"}
                        </BotaoPadrao>
                    </div>
                </form>
            </section>
        </Container>
    );
}