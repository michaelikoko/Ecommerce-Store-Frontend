import { Carousel, Button } from "react-bootstrap"
import LatestProducts from "../components/LatestProducts"
import { useSelector } from "react-redux/es/exports"
import { useNavigate } from "react-router-dom"
import image1 from "../images/image1.jfif"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.jpg"

export default function HomePage()
{
  const { latestProducts, isLoading, loadingFailed } = useSelector( store => store.latestProducts)
  const navigate = useNavigate()
    return (
        <section className="home">
          <Carousel className="home-hero">
            <Carousel.Item>
              <img
                className="d-block w-100 home-hero-img"
                src={image1}
                alt="First slide"
              />
              <Carousel.Caption>
                  <h4>We offer you quality electronic accessories</h4>
                  <Button variant="primary" size="lg" onClick={()=>navigate("/products")}>Shop now</Button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 home-hero-img"
                src={image2}
                alt="Second slide"
              />

              <Carousel.Caption>
                  <h4>Browse through our incredible collection of laptops</h4>
                  <Button variant="primary" size="lg" onClick={()=>navigate("/products")}>Shop now</Button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 home-hero-img"
                src={image3}
                alt="Third slide"
              />

              <Carousel.Caption>
                  <h4>We have the best smartphones in store for you</h4>
                  <Button variant="primary" size="lg" onClick={()=>navigate("/products")}>Shop now</Button>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <section className="latest-products mt-5 container">
            <h2 className="mb-4 text-center border-bottom p-1">Featured Products</h2>
            <LatestProducts isLoading={isLoading} loadingFailed={loadingFailed} latestProducts={latestProducts}/>
          </section>
        </section>
    )
}