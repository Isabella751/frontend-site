import { Container } from '../../components/Container';
import { MainForm } from '../../MainForm';
import { useState, useEffect } from 'react';
import { ListaCursos } from '../../ListaCursos';
import type { Curso } from '../../ListaCursos';


export function Home() {

  const [cursos, setCursos] = useState<Curso[]>(() => {
    const cursosSalvos = localStorage.getItem("cursosLocalStorage");
    if (cursosSalvos) {
      return JSON.parse(cursosSalvos);
    }
    return [];
  });

  const [cursoEmEdicao, setCursoEmEdicao] = useState<Curso | null>(null);

  useEffect(() => {
    localStorage.setItem("cursosLocalStorage", JSON.stringify(cursos));
  }, [cursos]);
  const adicionarCurso = (novoCurso: Curso) => {
    setCursos((cursosAtuais) => {
      const maiorIdAtual = cursosAtuais.length > 0?Math.max(...cursosAtuais.map(curso => Number(curso.id))) : 0;
      const cursoFinal = {...novoCurso, id:String(maiorIdAtual + 1)};
      return [...cursosAtuais, cursoFinal];
    });
  };

  const excluirCurso = (id: string) => {
    const cursosAtualizado = cursos.filter((curso) => String(curso.id) !== String(id));
    setCursos(cursosAtualizado);
  };

  const atualizarCurso = (cursoAtualizado: Curso) => {
    const cursosAtualizado = cursos.map((curso) => 
      String(curso.id) === String(cursoAtualizado.id) ? cursoAtualizado : curso
    );
    setCursos(cursosAtualizado);  
    setCursoEmEdicao(null);
  };

  const editarCurso = (curso: Curso) => {
    setCursoEmEdicao(curso);
  }
  
  return (
    <>
        <Container>
            <MainForm 
            aoAdicionar={adicionarCurso}
            aoAtualizar={atualizarCurso}
            cursoEmEdicao={cursoEmEdicao}
            />
            <ListaCursos
            cursos={cursos}
            aoEditar={editarCurso}
            aoExcluir={excluirCurso}
            />
        </Container>
    </>
  );
}