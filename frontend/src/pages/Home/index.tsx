import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Carousel, Container, Row, Col, Modal, Button } from "react-bootstrap";
import { fetchMovies, fetchRecommendations } from "../../services/movieService";
import type { Movie } from "../../types/Movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * perPage;
      const data = await fetchMovies(perPage, offset);
      setMovies(data.items);
      setTotalRows(data.total);
    } catch (err) {
      console.error("Erro ao carregar filmes", err);
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendations = async () => {
    try {
      const data = await fetchRecommendations(20);
      setRecommendations(data);
    } catch (err) {
      console.error("Erro ao carregar recomendações", err);
    }
  };

  useEffect(() => {
    loadMovies(1);
    loadRecommendations();
  }, []);

  const handlePageChange = (page: number) => {
    loadMovies(page);
  };

  const handleImageClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Movie) => row.id.toString(),
      sortable: true,
    },
    {
      name: "Título",
      selector: (row: Movie) => row.title ?? "",
      sortable: true,
    },
    {
      name: "Nota Média",
      selector: (row: Movie) => row.vote_average?.toFixed(2) ?? "0.00",
      sortable: true,
    },
    {
      name: "Votos",
      selector: (row: Movie) => row.vote_count?.toString() ?? "0",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Movie) => row.status ?? "",
    },
    {
      name: "Data de Lançamento",
      selector: (row: Movie) => row.release_date ?? "",
    },
    {
      name: "Receita (US$)",
      selector: (row: Movie) =>
        row.revenue ? `$${row.revenue.toLocaleString()}` : "—",
      sortable: true,
    },
    {
      name: "Duração (min)",
      selector: (row: Movie) => row.runtime?.toString() ?? "—",
    },
    {
      name: "Adulto?",
      selector: (row: Movie) => (row.adult ? "Sim" : "Não"),
    },
    {
      name: "Imagem",
      cell: (row: Movie) =>
        row.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${row.backdrop_path}`}
            alt={row.title}
            style={{ height: "45px", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => handleImageClick(row)}
          />
        ) : (
          "—"
        ),
      ignoreRowClick: true,
    },
  ];

  return (
    <Container fluid className="mt-4">
      <Row className="align-items-center mb-4">
        <Col className="text-center">
          <h2 className="mb-0 text-white">Filmes Recomendados</h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Carousel fade interval={3000}>
            {recommendations.map((movie) => (
              <Carousel.Item key={movie.id}>
                {movie.backdrop_path ? (
                  <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    style={{ maxHeight: "450px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{ height: "450px", backgroundColor: "#ccc" }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <h5 className="text-dark">Sem imagem</h5>
                  </div>
                )}
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h5>{movie.title}</h5>
                  <p>{movie.overview?.slice(0, 120) || "Sem descrição."}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="mb-3 text-white">Todos os Filmes</h2>
          <DataTable
            columns={columns}
            data={movies}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            responsive
            striped
            highlightOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[]}
            paginationComponentOptions={{
              rowsPerPageText: "",
              rangeSeparatorText: "de",
              selectAllRowsItem: false,
            }}
          />
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  {selectedMovie.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                      alt={selectedMovie.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "300px",
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                      }}
                    >
                      Sem imagem
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <p><strong>Nota Média:</strong> {selectedMovie.vote_average?.toFixed(2)}</p>
                  <p><strong>Votos:</strong> {selectedMovie.vote_count}</p>
                  <p><strong>Status:</strong> {selectedMovie.status}</p>
                  <p><strong>Data de Lançamento:</strong> {selectedMovie.release_date}</p>
                  <p><strong>Receita:</strong> {selectedMovie.revenue ? `$${selectedMovie.revenue.toLocaleString()}` : "—"}</p>
                  <p><strong>Duração:</strong> {selectedMovie.runtime} minutos</p>
                  <p><strong>Adulto?</strong> {selectedMovie.adult ? "Sim" : "Não"}</p>
                  <p><strong>Descrição:</strong> {selectedMovie.overview || "Sem descrição."}</p>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}
