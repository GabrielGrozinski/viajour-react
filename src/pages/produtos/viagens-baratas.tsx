import { useState, useEffect, useRef, useMemo } from "react";
import '../../styles/produtos/viagens-baratas.css';
import MenuLateral from "../../components/menu-lateral";
import MenuVertical from "../../components/menu-vertical";
import AnuncioDesktop from "../../components/anuncio-desktop";
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';

interface Viagem {
  id: number;
  destino: string;
  custo: string;
  custoBruto: number;
  tipo: string;
  categoria: "nacional" | "internacional";
  descricao: string;
  img: string;
  keywords: string[],
}

const viagens: Viagem[] = [
  {
    id: 1,
    destino: "Gramado - RS",
    custo: "R$ 5.200",
    custoBruto: 5200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/20/12/prague-7172597_1280.jpg",
    descricao: "Pacote de 7 dias para explorar as atrações da serra gaúcha, restaurantes e passeios locais.",
    keywords: ["Gramado - RS", "viagem de 7 dias", "7 dias", "Gramado", "Rio Grande do Sul", "serra gaúcha"],
  },
  {
    id: 2,
    destino: "Penedo - RJ",
    custo: "R$ 4.100",
    custoBruto: 4100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2020/12/20/10/01/christmas-tree-5846564_1280.jpg",
    descricao: "Roteiro de 7 dias aproveitando pousadas, gastronomia local e passeios tranquilos.",
    keywords: ["Penedo - RJ", "viagem de 7 dias", "7 dias", "Penedo", "Rio de Janeiro"],
  },
  {
    id: 3,
    destino: "Curitiba - PR",
    custo: "R$ 3.600",
    custoBruto: 3600,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/11/24/02/05/christmas-lights-3834926_1280.jpg",
    descricao: "Semana de 7 dias com visitas a parques, mercados e experiências gastronômicas locais.",
    keywords: ["Curitiba - PR", "viagem de 7 dias", "7 dias", "Curitiba", "Paraná"],
  },
  {
    id: 4,
    destino: "Nova York - EUA",
    custo: `US$ 2.900 ou R$ ${(2900*5.3)}`,
    custoBruto: 2900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/12/29/19/19/marketplace-4727905_1280.jpg",
    descricao: "Itinerário de 7 dias para conhecer pontos emblemáticos, museus e bairros icônicos de Manhattan.",
    keywords: ["Nova York - EUA", "viagem de 7 dias", "7 dias", "Nova York", "Manhattan"],
  },
  {
    id: 5,
    destino: "Disneylândia - EUA",
    custo: `US$ 3.400 ou R$ ${(3400*5.3)}`,
    custoBruto: 3400*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/08/29/09/26/disney-2692578_1280.jpg",
    descricao: "Pacote de 7 dias com parques temáticos, shows e tempo para aproveitar atrações em família.",
    keywords: ["Disneylândia - EUA", "viagem de 7 dias", "7 dias", "Disney", "parque temático", "viagem em família" ]
  },
  {
    id: 6,
    destino: "Viena - Áustria",
    custo: `€ 2.500 ou R$ ${(2500*6.2)}`,
    custoBruto: 2500*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/01/24/16/29/horses-6963914_1280.jpg",
    descricao: "Roteiro de 7 dias explorando mercados, museus e concertos — ideal para uma semana cultural.",
    keywords: ["Viena - Áustria", "viagem de 7 dias", "7 dias", "Viena", "Áustria"],
  },
  {
    id: 7,
    destino: "Campos do Jordão - SP",
    custo: "R$ 2.800",
    custoBruto: 2800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/10/29/prague-7171444_1280.jpg",
    descricao: "Semana de 7 dias para aproveitar a serra, gastronomia e passeios por pontos turísticos locais.",
    keywords: ["Campos do Jordão - SP", "viagem de 7 dias", "7 dias", "Campos do Jordão", "São Paulo"],
  },
  {
    id: 8,
    destino: "Bonito - MS",
    custo: "R$ 3.200",
    custoBruto: 3200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/11/18/18/35/hamburg-3823819_1280.jpg",
    descricao: "Roteiro de 7 dias voltado a atividades ao ar livre, rios cristalinos e ecoturismo.",
    keywords: ["Bonito - MS", "viagem de 7 dias", "7 dias", "Bonito", "Mato Grosso do Sul", "ecoturismo"],
  },
  {
    id: 9,
    destino: "Foz do Iguaçu - PR",
    custo: "R$ 2.900",
    custoBruto: 2900,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/09/07/02/25/city-4457801_1280.jpg",
    descricao: "Pacote de 7 dias com visitas às cataratas e atividades de aventura na região.",
    keywords: ["Foz do Iguaçu - PR", "viagem de 7 dias", "7 dias", "Foz do Iguaçu", "Paraná", "Cataratas do Iguaçu"],
  },
  {
    id: 10,
    destino: "Natal - RN",
    custo: "R$ 2.400",
    custoBruto: 2400,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/12/15/14/55/czech-republic-4697278_1280.jpg",
    descricao: "Semana de 7 dias para curtir praias, passeios costeiros e descanso à beira-mar.",
    keywords: ["Natal - RN", "viagem de 7 dias", "7 dias", "Natal", "Rio Grande do Norte", "praias"],
  },
  {
    id: 11,
    destino: "Salvador - BA",
    custo: "R$ 2.700",
    custoBruto: 2700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/11/21/20/34/philadelphia-4643451_1280.jpg",
    descricao: "Roteiro de 7 dias para conhecer a cultura, pontos históricos e experimentar a culinária local.",
    keywords: ["Salvador - BA", "viagem de 7 dias", "7 dias", "Salvador", "Bahia", "culinária baiana"],
  },
  {
    id: 12,
    destino: "Manaus - AM",
    custo: "R$ 3.100",
    custoBruto: 3100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/02/10/00/37/santiago-263235_1280.jpg",
    descricao: "Pacote de 7 dias com passeios de ecoturismo, cruzeiros e imersão cultural na região amazônica.",
    keywords: ["Manaus - AM", "viagem de 7 dias", "7 dias", "Manaus", "Amazonas", "ecoturismo"],
  },
  {
    id: 13,
    destino: "Fernando de Noronha - PE",
    custo: "R$ 6.800",
    custoBruto: 6800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/05/31/04/59/cities-3443208_1280.jpg",
    descricao: "Semana de 7 dias para aproveitar praias, mergulho e conservação marinha em um arquipélago preservado.",
    keywords: ["Fernando de Noronha - PE", "viagem de 7 dias", "7 dias", "Fernando de Noronha", "Pernambuco", "mergulho"],
  },
  {
    id: 14,
    destino: "Morro de São Paulo - BA",
    custo: "R$ 3.500",
    custoBruto: 3500,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/10/25/09/09/city-4576421_1280.jpg",
    descricao: "Roteiro de 7 dias para relaxar em praias calmas, explorar ilhas e curtir a vida local.",
    keywords: ["Morro de São Paulo - BA", "viagem de 7 dias", "7 dias", "Morro de São Paulo", "Bahia", "praias"]
  },
  {
    id: 15,
    destino: "Lisboa - Portugal",
    custo: `€ 1.200 ou R$ ${(1200*6.2)}`,
    custoBruto: 1200*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2014/11/21/17/23/new-york-540807_1280.jpg",
    descricao: "Pacote de 7 dias explorando ruas históricas, gastronomia e bairros pitorescos de Lisboa.",
    keywords: ["Lisboa - Portugal", "viagem de 7 dias", "7 dias", "Lisboa", "Portugal", "ruas históricas"],
  },
  {
    id: 16,
    destino: "Paris - França",
    custo: `€ 1.600 ou R$ ${(1600*6.2)}`,
    custoBruto: 1600*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/10/30/15/21/travel-2902737_1280.jpg",
    descricao: "Itinerário de 7 dias para conhecer museus, cafés e bairros cheios de charme em Paris.",
    keywords: ["Paris - França", "viagem de 7 dias", "7 dias", "Paris", "França", "cafés"],
  },
  {
    id: 17,
    destino: "Londres - Reino Unido",
    custo: `£ 1.400 ou R$ ${(1400*7)}`,
    custoBruto: 1400*7,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/10/15/12/50/prague-5656740_1280.jpg",
    descricao: "Roteiro de 7 dias com museus, teatros e passeios históricos pela cidade.",
    keywords: ["Londres - Reino Unido", "viagem de 7 dias", "7 dias", "Londres", "Reino Unido", "teatros"],
  },
  {
    id: 18,
    destino: "Tóquio - Japão",
    custo: `¥ 330.000 ou R$ ${(330000*0.03)}`,
    custoBruto: 330000*0.03,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/04/04/17/58/road-4103334_1280.jpg",
    descricao: "Pacote de 7 dias para explorar bairros urbanos, gastronomia e experiências culturais em Tóquio.",
    keywords: ["Tóquio - Japão", "viagem de 7 dias", "7 dias", "Tóquio", "Japão", "culinária japonesa"],
  },
  {
    id: 19,
    destino: "Sydney - Austrália",
    custo: `US$ 3.900 ou R$ ${(3900*5.3)}`,
    custoBruto: 3900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2013/12/28/13/14/sidney-234714_1280.jpg",
    descricao: "Roteiro de 7 dias combinando praias, pontos urbanos e atividades ao ar livre." ,
    keywords: ["Sydney - Austrália", "viagem de 7 dias", "7 dias", "Sydney", "Austrália", "praias"],
  },
  {
    id: 20,
    destino: "Bali - Indonésia",
    custo: `US$ 1.900 ou R$ ${(1900*5.3)}`,
    custoBruto: 1900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/08/29/21/39/snow-2694971_1280.jpg",
    descricao: "Pacote de 7 dias para relaxamento em praias tropicais, templos e experiências locais.",
    keywords: ["Bali - Indonésia", "viagem de 7 dias", "7 dias", "Bali", "Indonésia", "praias tropicais"],
  },
  {
    id: 21,
    destino: "Cidade do Cabo - África do Sul",
    custo: `US$ 1.350 ou R$ ${(1350*5.3)}`,
    custoBruto: 1350*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/05/31/20/02/city-view-1427730_1280.jpg",
    descricao: "Roteiro de 7 dias com paisagens costeiras, vinhos locais e atividades na natureza.",
    keywords: ["Cidade do Cabo - África do Sul", "viagem de 7 dias", "7 dias", "Cidade do Cabo", "África do Sul"],
  },
  {
    id: 22,
    destino: "Reykjavik - Islândia",
    custo: `€ 2.000 ou R$ ${(2000*6.2)}`,
    custoBruto: 2000*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2013/10/04/21/13/san-diego-190898_1280.jpg",
    descricao: "Semana de 7 dias para explorar paisagens vulcânicas, geotermais e, quando possível, auroras boreais.",
    keywords: ["Reykjavik - Islândia", "viagem de 7 dias", "7 dias", "Reykjavik", "Islândia"],
  },
  {
    id: 23,
    destino: "Vancouver - Canadá",
    custo: `US$ 2.100 ou R$ ${(2000*5.3)}`,
    custoBruto: 2100*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/08/10/19/11/los-angeles-1584089_1280.jpg",
    descricao: "Pacote de 7 dias combinando atividades urbanas e passeios para montanhas próximas ou parques naturais.",
    keywords: ["Vancouver - Canadá", "viagem de 7 dias", "7 dias", "Vancouver", "Canadá"],
  },
  {
    id: 24,
    destino: "Roma - Itália",
    custo: `€ 1.500 ou R$ ${(1500*6.2)}`,
    custoBruto: 1500*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505450_1280.jpg",
    descricao: "Roteiro de 7 dias para descobrir sítios históricos, praças e a rica gastronomia romana.",
    keywords: ["Roma - Itália", "viagem de 7 dias", "7 dias", "Roma", "Itália", "história"],
  },
  {
    id: 25,
    destino: "Praga - República Tcheca",
    custo: `€ 1.100 ou R$ ${(1500*6.2)}`,
    custoBruto: 1100*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/25/19/14/paris-4793200_1280.jpg",
    descricao: "Semana de 7 dias para explorar arquitetura histórica, praças e roteiros culturais em Praga.",
    keywords: ["Praga - República Tcheca", "viagem de 7 dias", "7 dias", "Praga", "República Tcheca"],
  },
  {
    id: 26,
    destino: "Dubai - Emirados Árabes",
    custo: `US$ 2.400 ou R$ ${(2400*5.3)}`,
    custoBruto: 2400*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/03/11/14/32/burj-khalifa-4922317_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar atrações modernas, compras e experiências urbanas exclusivas.",
    keywords: ["Dubai - Emirados Árabes", "viagem de 7 dias", "7 dias", "Dubai", "Emirados Árabes"],
  },
  {
    id: 27,
    destino: "Belo Horizonte - MG",
    custo: "R$ 2.100",
    custoBruto: 2100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2025/07/16/10/33/rice-9717641_1280.jpg",
    descricao: "Roteiro de 7 dias focado em gastronomia, cultura e cidades históricas na região.",
    keywords: ["Belo Horizonte - MG", "viagem de 7 dias", "7 dias", "Belo Horizonte", "Minas Gerais", "gastronomia"],
  },
  {
    id: 28,
    destino: "Ilhéus - BA",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2023/12/06/17/17/street-8434099_1280.jpg",
    descricao: "Pacote de 7 dias combinando praias, história local e cultura regional.",
    keywords: ["Ilhéus - BA", "viagem de 7 dias", "7 dias", "Ilhéus", "Bahia"],
  },
  {
    id: 29,
    destino: "Mendoza - Argentina",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2023/07/12/18/21/croatia-8123037_1280.jpg",
    descricao: "Roteiro de 7 dias para visitar vinhedos, degustações e passeios na região andina.",
    keywords: ["Mendoza - Argentina", "viagem de 7 dias", "7 dias", "Mendoza", "Argentina", "vinhedos"],
  },
  {
    id: 30,
    destino: "Berlim - Alemanha",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/05/08/11/24/city-6238228_1280.jpg",
    descricao: "Pacote de 7 dias combinando história, museus e vida cultural em Berlim.",
    keywords: ["Berlim - Alemanha", "viagem de 7 dias", "7 dias", "Berlim", "Alemanha"],
  },
  {
    id: 31,
    destino: "Nuremberg - Alemanha",
    custo: `€ 1.100 ou R$ ${(1100*6.2)}`,
    custoBruto: 1100*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/06/18/21/40/strasbourg-7270721_1280.jpg",
    descricao: "Roteiro de 7 dias para conhecer a cidade histórica e saborear comidas típicas locais.",
    keywords: ["Nuremberg - Alemanha", "viagem de 7 dias", "7 dias", "Nuremberg", "Alemanha"],
  },
  {
    id: 32,
    destino: "Edimburgo - Escócia",
    custo: `£ 1.100 ou R$ ${(1100*7)}`,
    custoBruto: 1100*7,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/04/22/20/54/assisi-city-7150611_1280.jpg",
    descricao: "Pacote de 7 dias explorando ruas históricas, festivais locais e atrações culturais.",
    keywords: ["Edimburgo - Escócia", "viagem de 7 dias", "7 dias", "Edimburgo", "Escócia"],
  },
  {
    id: 33,
    destino: "Sevilha - Espanha",
    custo: `€ 900 ou R$ ${(900*6.2)}`,
    custoBruto: 900*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/11/24/10/00/city-5772040_1280.jpg",
    descricao: "Roteiro de 7 dias para aproveitar clima ameno, arquitetura e cultura andaluza.",
    keywords: ["Sevilha - Espanha", "viagem de 7 dias", "7 dias", "Sevilha", "Espanha"],
  },
  {
    id: 34,
    destino: "Santorini - Grécia",
    custo: `€ 1.700 ou R$ ${(1700*6.2)}`,
    custoBruto: 1700*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/12/14/16/15/city-6870803_1280.jpg",
    descricao: "Semana de 7 dias para curtir ilhas, paisagens e pôr do sol em cenários pitorescos.",
    keywords: ["Santorini - Grécia", "viagem de 7 dias", "7 dias", "Santorini", "Grécia"],
  },
  {
    id: 35,
    destino: "Göteborg - Suécia",
    custo: `€ 1.050 ou R$ ${(1050*6.2)}`,
    custoBruto: 1050*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/02/27/20/57/building-4885833_1280.jpg",
    descricao: "Roteiro de 7 dias para experimentar gastronomia nórdica, mercados e cultura local.",
    keywords: ["Göteborg - Suécia", "viagem de 7 dias", "7 dias", "Göteborg", "Suécia"],
  },
  {
    id: 36,
    destino: "Zermatt - Suíça",
    custo: `CHF 1.800 ou R$ ${(1800*5.8)}`,
    custoBruto: 1800*5.8,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525_1280.jpg",
    descricao: "Semana de 7 dias para atividades de montanha, trilhas e esportes de neve (quando disponíveis).",
    keywords: ["Zermatt - Suíça", "viagem de 7 dias", "7 dias", "Zermatt", "Suíça", "montanha"],
  },
  {
    id: 37,
    destino: "Recife - PE",
    custo: "R$ 2.200",
    custoBruto: 2200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/01/30/18/07/salzburg-5964812_1280.jpg",
    descricao: "Pacote de 7 dias para conhecer praias urbanas, centros históricos e gastronomia local.",
    keywords: ["Recife - PE", "viagem de 7 dias", "7 dias", "Recife", "Pernambuco"],
  },
  {
    id: 38,
    destino: "Florianópolis - SC",
    custo: "R$ 2.400",
    custoBruto: 2400,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2016/11/23/15/32/pedestrians-1853552_1280.jpg",
    descricao: "Roteiro de 7 dias para aproveitar praias variadas, trilhas e vida noturna local.",
    keywords: ["Florianópolis - SC", "viagem de 7 dias", "7 dias", "Florianópolis", "Santa Catarina"],
  },
  {
    id: 39,
    destino: "Ouro Preto - MG",
    custo: "R$ 1.800",
    custoBruto: 1800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/07/23/11/38/switzerland-6487204_1280.jpg",
    descricao: "Pacote de 7 dias para explorar o centro histórico, museus e a culinária mineira.",
    keywords: ["Ouro Preto - MG", "viagem de 7 dias", "7 dias", "Ouro Preto", "Minas Gerais"],
  },
  {
    id: 40,
    destino: "Porto Seguro - BA",
    custo: "R$ 2.300",
    custoBruto: 2300,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/06/17/05/14/city-6342765_1280.jpg",
    descricao: "Semana de 7 dias com praias, passeios culturais e opções de lazer para todas as idades.",
    keywords: ["Porto Seguro - BA", "viagem de 7 dias", "7 dias", "Porto Seguro", "Bahia"],
  },
  {
    id: 41,
    destino: "Chapada Diamantina - BA",
    custo: "R$ 3.000",
    custoBruto: 3000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/20/09/prague-7172594_1280.jpg",
    descricao: "Roteiro de 7 dias com trilhas, cachoeiras e experiências de ecoturismo na Chapada.",
    keywords: ["Chapada Diamantina - BA", "viagem de 7 dias", "7 dias", "Chapada Diamantina", "Bahia"],
  },
  {
    id: 42,
    destino: "Buenos Aires - Argentina",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/11/29/12/16/buildings-1869425_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar tango, gastronomia e roteiros culturais pela cidade.",
    keywords: ["Buenos Aires - Argentina", "viagem de 7 dias", "7 dias", "Buenos Aires", "Argentina"],
  },
  {
    id: 43,
    destino: "Amsterdam - Holanda",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/07/03/16/42/amsterdam-5367020_1280.jpg",
    descricao: "Roteiro de 7 dias passando por canais, museus e design urbano em Amsterdam.",
    keywords: ["Amsterdam - Holanda", "viagem de 7 dias", "7 dias", "Amsterdam", "Holanda"],
  },
  {
    id: 44,
    destino: "Barcelona - Espanha",
    custo: `€ 1.150 ou R$ ${(1150*6.2)}`,
    custoBruto: 1150*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/03/09/13/45/dubai-4044183_1280.jpg",
    descricao: "Pacote de 7 dias para conhecer a arquitetura de Gaudí, praias e vida cultural local.",
    keywords: ["Barcelona - Espanha", "viagem de 7 dias", "7 dias", "Barcelona", "Espanha"],
  },
  {
    id: 45,
    destino: "Hong Kong - China",
    custo: `US$ 1.700 ou R$ ${(1700*5.3)}`,
    custoBruto: 1700*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/02/20/13/25/city-4864747_1280.jpg",
    descricao: "Roteiro de 7 dias combinando arranha-céus, mercados noturnos e gastronomia local.",
    keywords: ["Hong Kong - China", "viagem de 7 dias", "7 dias", "Hong Kong", "China"],
  },
  {
    id: 46,
    destino: "Montreal - Canadá",
    custo: `US$ 1.600 ou R$ ${(1600*5.3)}`,
    custoBruto: 1600*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2014/08/26/14/11/cathedral-427997_1280.jpg",
    descricao: "Pacote de 7 dias com arquitetura marcante, mercados e experiências culturais em Montreal.",
    keywords: ["Montreal - Canadá", "viagem de 7 dias", "7 dias", "Montreal", "Canadá"],
  },
  {
    id: 47,
    destino: "João Pessoa - PB",
    custo: "R$ 1.900",
    custoBruto: 1900,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2020/04/11/14/42/street-5030692_1280.jpg",
    descricao: "Semana de 7 dias para relaxar em praias tranquilas e aproveitar passeios costeiros.",
    keywords: ["João Pessoa - PB", "viagem de 7 dias", "7 dias", "João Pessoa", "Paraíba"],
  },
  {
    id: 48,
    destino: "Arraial do Cabo - RJ",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/12/03/20/59/town-6843799_1280.jpg",
    descricao: "Roteiro de 7 dias com mergulho, passeios de barco e praias de águas cristalinas.",
    keywords: ["Arraial do Cabo - RJ", "viagem de 7 dias", "7 dias", "Arraial do Cabo", "Rio de Janeiro"],
  },
  {
    id: 49,
    destino: "Búzios - RJ",
    custo: "R$ 2.350",
    custoBruto: 2350,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/08/27/14/29/stone-building-7414577_1280.jpg",
    descricao: "Pacote de 7 dias para curtir praias charmosas, passeios e opções de vida noturna.",
    keywords: ["Búzios - RJ", "viagem de 7 dias", "7 dias", "Búzios", "Rio de Janeiro"],
  },
  {
    id: 50,
    destino: "Paraty - RJ",
    custo: "R$ 1.700",
    custoBruto: 1700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/01/18/18/10/mountain-6947848_1280.jpg",
    descricao: "Roteiro de 7 dias entre centro histórico, passeios de barco e gastronomia local.",
    keywords: ["Paraty - RJ", "viagem de 7 dias", "7 dias", "Paraty", "Rio de Janeiro"],
  },
  {
    id: 51,
    destino: "Porto de Galinhas - PE",
    custo: "R$ 2.350",
    custoBruto: 2350,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/10/02/01/40/town-469252_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar piscinas naturais, praias e atividades aquáticas.",
    keywords: ["Porto de Galinhas - PE", "viagem de 7 dias", "7 dias", "Porto de Galinhas", "Pernambuco"],
  },
  {
    id: 52,
    destino: "Seul - Coreia do Sul",
    custo: `US$ 1.700 ou R$ ${(1700*5.3)}`,
    custoBruto: 1700*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/02/11/34/lavaux-6763006_1280.jpg",
    descricao: "Roteiro de 7 dias misturando cultura pop, tecnologia e gastronomia urbana em Seul.",
    keywords: ["Seul - Coreia do Sul", "viagem de 7 dias", "7 dias", "Seul", "Coreia do Sul"],
  },
  {
    id: 53,
    destino: "Auckland - Nova Zelândia",
    custo: `US$ 2.400 ou R$ ${(2400*5.3)}`,
    custoBruto: 2400*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/13/12/33/vineyards-6791178_1280.jpg",
    descricao: "Pacote de 7 dias explorando paisagens naturais, ilhas e atividades ao ar livre.",
    keywords: ["Auckland - Nova Zelândia", "viagem de 7 dias", "7 dias", "Auckland", "Nova Zelândia"],
  },
  {
    id: 54,
    destino: "Marrakech - Marrocos",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2018/01/20/10/14/architecture-3094199_1280.jpg",
    descricao: "Roteiro de 7 dias por medinas, mercados e palácios com forte influência cultural.",
    keywords: ["Marrakech - Marrocos", "viagem de 7 dias", "7 dias", "Marrakech", "Marrocos"],
  },
  {
    id: 55,
    destino: "Kuala Lumpur - Malásia",
    custo: `US$ 1.350 ou R$ ${(1350*5.3)}`,
    custoBruto: 1350*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/11/14/04/24/buffalo-1822581_1280.jpg",
    descricao: "Pacote de 7 dias com experiências multiculturais, gastronomia e pontos urbanos em Kuala Lumpur.",
    keywords: ["Kuala Lumpur - Malásia", "viagem de 7 dias", "7 dias", "Kuala Lumpur", "Malásia"],
  },
  {
    id: 56,
    destino: "Santiago - Chile",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/12/11/11/08/mountain-6862538_1280.jpg",
    descricao: "Roteiro de 7 dias para conhecer a cidade, vinícolas e roteiros próximos às montanhas.",
    keywords: ["Santiago - Chile", "viagem de 7 dias", "7 dias", "Santiago", "Chile"],
  },
  {
    id: 57,
    destino: "Maceió - AL",
    custo: "R$ 1.950",
    custoBruto: 1950,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/10/25/16/33/town-6741493_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar praias de águas cristalinas e passeios de snorkel.",
    keywords: ["Maceió - AL", "viagem de 7 dias", "7 dias", "Maceió", "Alagoas"],
  },
  {
    id: 58,
    destino: "São Luís - MA",
    custo: "R$ 1.700",
    custoBruto: 1700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/05/18/19/19/botanical-347384_1280.jpg",
    descricao: "Roteiro de 7 dias com centro histórico, manifestações culturais e passeios costeiros.",
    keywords: ["São Luís - MA", "viagem de 7 dias", "7 dias", "São Luís", "Maranhão"],
  },
  {
    id: 59,
    destino: "Belém - PA",
    custo: "R$ 1.800",
    custoBruto: 1800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2015/12/06/15/17/portugal-1079586_1280.jpg",
    descricao: "Pacote de 7 dias para explorar sabores amazônicos, mercados e roteiros culturais.",
    keywords: ["Belém - PA", "viagem de 7 dias", "7 dias", "Belém", "Pará"],
  },
  {
    id: 60,
    destino: "Vitória - ES",
    custo: "R$ 1.650",
    custoBruto: 1650,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/05/30/11/57/vitoria-3441335_1280.jpg",
    descricao: "Roteiro de 7 dias entre praias urbanas, ilhas próximas e boa gastronomia litorânea.",
    keywords: ["Vitória - ES", "viagem de 7 dias", "7 dias", "Vitória", "Espírito Santo"],
  },
  {
    id: 61,
    destino: "Campo Grande - MS",
    custo: "R$ 1.500",
    custoBruto: 1500,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/10/12/05/50/lighthouse-6702434_1280.jpg",
    descricao: "Pacote de 7 dias com roteiros para o Pantanal: observação de fauna, passeios e natureza.",
    keywords: ["Campo Grande - MS", "viagem de 7 dias", "7 dias", "Campo Grande", "Mato Grosso do Sul", "Pantanal"],
  },
  {
    id: 62,
    destino: "Dublin - Irlanda",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/22/18/11/town-6817089_1280.jpg",
    descricao: "Roteiro de 7 dias entre pubs tradicionais, música ao vivo e passeios históricos em Dublin.",
    keywords: ["Dublin - Irlanda", "viagem de 7 dias", "7 dias", "Dublin", "Irlanda"],
  },
  {
    id: 63,
    destino: "Oslo - Noruega",
    custo: `€ 1.500 ou R$ ${(1500*6.2)}`,
    custoBruto: 1500*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/04/29/07/48/village-6215845_1280.jpg",
    descricao: "Pacote de 7 dias para explorar mercados, museus e natureza nórdica em Oslo.",
    keywords: ["Oslo - Noruega", "viagem de 7 dias", "7 dias", "Oslo", "Noruega"],
  },
  {
    id: 64,
    destino: "Helsinque - Finlândia",
    custo: `€ 1.200 ou R$ ${(1200*6.2)}`,
    custoBruto: 1200*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2023/05/05/06/19/street-7971714_1280.jpg",
    descricao: "Roteiro de 7 dias com arquitetura moderna, mercados locais e experiências ao ar livre.",
    keywords: ["Helsinque - Finlândia", "viagem de 7 dias", "7 dias", "Helsinque", "Finlândia"],
  },
  {
    id: 65,
    destino: "Bangkok - Tailândia",
    custo: `US$ 1.300 ou R$ ${(1300*5.3)}`,
    custoBruto: 1300*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/03/27/14/32/rotterdam-7095262_1280.jpg",
    descricao: "Pacote de 7 dias para vivenciar templos, mercados e a culinária vibrante de Bangkok.",
    keywords: ["Bangkok - Tailândia", "viagem de 7 dias", "7 dias", "Bangkok", "Tailândia"],
  },
  {
    id: 66,
    destino: "Istambul - Turquia",
    custo: `US$ 1.150 ou R$ ${(1150*5.3)}`,
    custoBruto: 1150*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/16/06/50/town-6800271_1280.jpg",
    descricao: "Roteiro de 7 dias para explorar bazares, mesquitas e a diversidade cultural entre Europa e Ásia.",
    keywords: ["Istambul - Turquia", "viagem de 7 dias", "7 dias", "Istambul", "Turquia"],
  },
  {
    id: 67,
    destino: "Jericoacoara - CE",
    custo: "R$ 2.100",
    custoBruto: 2100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2017/04/26/19/28/the-national-library-2263515_1280.jpg",
    descricao: "Semana de 7 dias com dunes, lagoas e atividades aquáticas ideais para esportes náuticos.",
    keywords: ["Jericoacoara - CE", "viagem de 7 dias", "7 dias", "Jericoacoara", "Ceará"],
  },
  {
    id: 68,
    destino: "Maragogi - AL",
    custo: "R$ 2.200",
    custoBruto: 2200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/07/03/22/11/arapongas-3514905_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar piscinas naturais, mergulho e praias paradisíacas.",
    keywords: ["Maragogi - AL", "viagem de 7 dias", "7 dias", "Maragogi", "Alagoas"],
  },
  {
    id: 69,
    destino: "Pipa - RN",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/02/09/03/57/brazil-5997313_1280.jpg",
    descricao: "Roteiro de 7 dias entre falésias, praias e opções de lazer com atmosfera descontraída.",
    keywords: ["Pipa - RN", "viagem de 7 dias", "7 dias", "Pipa", "Rio Grande do Norte"],
  },
  {
    id: 70,
    destino: "Lençóis Maranhenses - MA",
    custo: "R$ 3.100",
    custoBruto: 3100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2024/08/26/23/38/maranhao-sheets-9000410_1280.jpg",
    descricao: "Pacote de 7 dias para explorar dunas, lagoas e roteiros fotográficos únicos.",
    keywords: ["Lençóis Maranhenses - MA", "viagem de 7 dias", "7 dias", "Lençóis Maranhenses", "Maranhão"],
  },
  {
    id: 71,
    destino: "Canela - RS",
    custo: "R$ 2.700",
    custoBruto: 2700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2013/08/09/05/58/kuala-lumpur-170985_1280.jpg",
    descricao: "Roteiro de 7 dias entre atrações serranas, natureza e passeios próximos à região." ,
    keywords: ["Canela - RS", "viagem de 7 dias", "7 dias", "Canela", "Rio Grande do Sul"],
  },
  {
    id: 72,
    destino: "Veneza - Itália",
    custo: `€ 1.400 ou R$ ${(1400*6.2)}`,
    custoBruto: 1400*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/08/21/17/52/bridge-1610395_1280.jpg",
    descricao: "Pacote de 7 dias para passeios de gôndola, praças históricas e roteiros culturais.",
    keywords: ["Veneza - Itália", "viagem de 7 dias", "7 dias", "Veneza", "Itália"],
  },
  {
    id: 73,
    destino: "Los Angeles - EUA",
    custo: `US$ 1.450 ou R$ ${(1450*5.3)}`,
    custoBruto: 1450*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/20/05/15/car-6810885_1280.jpg",
    descricao: "Roteiro de 7 dias entre atrações culturais, entretenimento e praias próximas a Los Angeles.",
    keywords: ["Los Angeles - EUA", "viagem de 7 dias", "7 dias", "Los Angeles", "EUA"],
  },
  {
    id: 74,
    destino: "Nova Délhi - Índia",
    custo: `US$ 1.100 ou R$ ${(1100*5.3)}`,
    custoBruto: 1100*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/31/14/27/taj-mahal-sunset-4808233_1280.jpg",
    descricao: "Pacote de 7 dias para explorar monumentos históricos, mercados e a culinária local.",
    keywords: ["Nova Délhi - Índia", "viagem de 7 dias", "7 dias", "Délhi", "Índia"],
  },
  {
    id: 75,
    destino: "Singapura - Singapura",
    custo: `US$ 1.300 ou R$ ${(1300*5.3)}`,
    custoBruto: 1300*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/04/19/15/35/tower-4139724_1280.jpg",
    descricao: "Roteiro de 7 dias por jardins urbanos, pontos turísticos e experiências gastronômicas.",
    keywords: ["Singapura - Singapura", "viagem de 7 dias", "7 dias", "Singapura"],
  },
  {
    id: 76,
    destino: "Madri - Espanha",
    custo: `€ 1.000 ou R$ ${(1000*6.2)}`,
    custoBruto: 1000*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/07/27/16/52/belgium-6497401_1280.jpg",
    descricao: "Pacote de 7 dias para conhecer praças históricas, mercados e a cena cultural de Madri.",
    keywords: ["Madri - Espanha", "viagem de 7 dias", "7 dias", "Madri", "Espanha"],
  },
  {
    id: 77,
    destino: "Ilhabela - SP",
    custo: "R$ 1.950",
    custoBruto: 1950,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/03/17/13/12/ilhabela-6102274_1280.jpg",
    descricao: "Roteiro de 7 dias com praias preservadas, trilhas e esportes aquáticos em Ilhabela.",
    keywords: ["Ilhabela - SP", "viagem de 7 dias", "7 dias", "Ilhabela", "São Paulo"],
  },
  {
    id: 78,
    destino: "Tiradentes - MG",
    custo: "R$ 1.600",
    custoBruto: 1600,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/10/12/17/19/minas-485767_1280.jpg",
    descricao: "Pacote de 7 dias para explorar o centro histórico, ateliês e a gastronomia regional.",
    keywords: ["Tiradentes - MG", "viagem de 7 dias", "7 dias", "Tiradentes", "Minas Gerais"],
  },
  {
    id: 79,
    destino: "Jalapão - TO",
    custo: "R$ 3.200",
    custoBruto: 3200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/11/21/11/48/nature-6813841_1280.jpg",
    descricao: "Roteiro de 7 dias para atividades de aventura, fervedouros e paisagens naturais impressionantes.",
    keywords: ["Jalapão - TO", "viagem de 7 dias", "7 dias", "Jalapão", "Tocantins"],
  },
  {
    id: 80,
    destino: "São Paulo - SP",
    custo: "R$ 1.300",
    custoBruto: 1300,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2016/11/20/08/34/buildings-1842205_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar vida urbana, cultura e gastronomia em São Paulo.",
    keywords: ["São Paulo - SP", "viagem de 7 dias", "7 dias", "São Paulo", "cidade"],
  },
  {
    id: 81,
    destino: "Guarapari - ES",
    custo: "R$ 1.850",
    custoBruto: 1850,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/01/28/17/11/zanzibar-253862_1280.jpg",
    descricao: "Roteiro de 7 dias entre praias populares, piscinas naturais e infraestrutura turística.",
    keywords: ["Guarapari - ES", "viagem de 7 dias", "7 dias", "Guarapari", "Espírito Santo"],
  },
  {
    id: 82,
    destino: "Bruxelas - Bélgica",
    custo: `€ 1.150 ou R$ ${(1150*6.2)}`,
    custoBruto: 1150*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/11/07/21/17/feldkirch-7577247_1280.jpg",
    descricao: "Pacote de 7 dias para visitar praças históricas, provar chocolates e conhecer a cena cultural.",
    keywords: ["Bruxelas - Bélgica", "viagem de 7 dias", "7 dias", "Bruxelas", "Bélgica"],
  },
  {
    id: 83,
    destino: "Lima - Peru",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/10/14/27/lima-6784100_1280.jpg",
    descricao: "Roteiro de 7 dias focado na gastronomia, história e centros culturais de Lima.",
    keywords: ["Lima - Peru", "viagem de 7 dias", "7 dias", "Lima", "Peru"],
  },
  {
    id: 84,
    destino: "Quito - Equador",
    custo: `US$ 900 ou R$ ${(900*5.3)}`,
    custoBruto: 900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/05/18/18/57/monsaraz-5188012_1280.jpg",
    descricao: "Pacote de 7 dias para explorar arquitetura colonial, mirantes e roteiros culturais nos Andes.",
    keywords: ["Quito - Equador", "viagem de 7 dias", "7 dias", "Quito", "Equador"],
  },
  {
    id: 85,
    destino: "Cairo - Egito",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/11/13/22/woman-4757533_1280.jpg",
    descricao: "Roteiro de 7 dias para visitar sítios arqueológicos, mercados e entender a história milenar local.",
    keywords: ["Cairo - Egito", "viagem de 7 dias", "7 dias", "Cairo", "Egito"],
  },
  {
    id: 86,
    destino: "Zanzibar - Tanzânia",
    custo: `US$ 1.600 ou R$ ${(1600*5.3)}`,
    custoBruto: 1600*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/08/28/09/30/zebra-7416165_1280.jpg",
    descricao: "Pacote de 7 dias para aproveitar praias exóticas, cultura local e passeios costeiros.",
    keywords: ["Zanzibar - Tanzânia", "viagem de 7 dias", "7 dias", "Zanzibar", "Tanzânia"],
  },
];

// Add continent keywords dynamically so we don't need to edit each entry by hand.
// We check destination + existing keywords for country names and append Portuguese
// continent keywords when a match is found.
const normalizeText = (s: string) => s.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['"`]/g, '');

const continentRules: { matches: string[]; add: string[] }[] = [
  { matches: ['portugal', 'frança', 'franca', 'france', 'espanha', 'italia', 'italy', 'alemanha', 'germany', 'reino unido', 'londres', 'holanda', 'amsterdam', 'belgica', 'bruxelas', 'república tcheca', 'praga', 'suécia', 'suecia', 'suica', 'suíça', 'noruega', 'finlândia', 'finlandia', 'grecia', 'grécia', 'viena', 'austria', 'roma', 'berlim', 'nuremberg', 'edimburgo'] , add: ['europa','europeu','viagem europa','viagem europeia'] },
  { matches: ['áfrica','africa','áfrica do sul','africa do sul','egito','cairo','marrocos','tanzânia','tanzania','zanzibar','cidade do cabo','cape town'], add: ['áfrica','africano','africana'] },
  { matches: ['eua','estados unidos','canadá','canada','argentina','chile','peru','equador','brasil','brazil','méxico','mexico','colombia','uruguai','bolívia','bolivia','venezuela','usa','nova york','new york'], add: ['américa','america','americano','americana','américa do sul','america do sul','américa do norte','america do norte'] },
  { matches: ['japão','japao','tóquio','tokyo','indonésia','indonesia','china','china','tailândia','tailandia','coreia','korea','malásia','malasia','singapura','singapore','hong kong','dubai','india','tailandia','bangkok'], add: ['ásia','asia','asiático','asiatica'] },
  { matches: ['austrália','australia','nova zelândia','new zealand','auckland','sydney'], add: ['oceania','oceânico','oceania'] },
];

const viagensAugmented: Viagem[] = viagens.map((v) => {
  const text = normalizeText([v.destino, ...(v.keywords || [])].join(' '));
  const extras = new Set<string>();

  for (const rule of continentRules) {
    for (const token of rule.matches) {
      if (text.includes(normalizeText(token))) {
        rule.add.forEach(k => extras.add(k));
        break; // matched this rule
      }
    }
  }

  // keep original keywords and append continent keywords (avoid duplicates)
  const existing = new Set(v.keywords.map(k => k.toLocaleLowerCase()));
  for (const e of Array.from(extras)) existing.add(e);

  return { ...v, keywords: Array.from(existing) } as Viagem;
});

const SliderCustomizado = styled(Slider)({
  color: "#f59e0b",
  height: 2.5,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    border: '2px solid #f59e0b',
    boxShadow: '0 0 6px rgba(0,0,0,0.3)'
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#ddd'
  }
});


export default function ViagensBaratas() {
  const [filtro, setFiltro] = useState<"nacional" | "internacional">("nacional");
  const [pesquisaAtiva, setPesquisaAtiva] = useState<boolean>(false);
  const [pesquisaAtual, setPesquisaAtual] = useState<string>('');
  const [largura, setLargura] = useState(window.innerWidth);
  const [value, setValue] = useState([0, 4000]);
  useEffect(() => {
    if (filtro === 'nacional') {
        setValue([0, 4000]);
    } else {
        setValue([0, 10000])
    }
  }, [filtro]);
  const [menuExpandidoH1, setMenuExpandidoH1] = useState<boolean>(false);
  const viagensFiltradasCusto = useMemo(() =>

    viagensAugmented.filter((v) => v.custoBruto >= value[0] && v.custoBruto <= value[1])
  , [value]);

  const viagensFiltradasTextoDigitado = useMemo(() => 
    viagensFiltradasCusto.filter((v) =>
      v.keywords.some(keyword => formatarString(keyword).includes(pesquisaAtual))
    ),
  [pesquisaAtual, viagensFiltradasCusto]);

  const viagensFiltradas = useMemo(
    () => viagensFiltradasTextoDigitado.filter((v) => v.categoria === filtro),
    [viagensFiltradasTextoDigitado, filtro]
  );

  // Paginação / infinite scroll
  const PAGE_SIZE = 12;
  const [itemsToShow, setItemsToShow] = useState<Viagem[]>(() => viagensFiltradas.slice(0, PAGE_SIZE));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset pagination when the filtered results change
  useEffect(() => {
    setItemsToShow(viagensFiltradas.slice(0, PAGE_SIZE));
  }, [viagensFiltradas]);

  // Infinite-scroll: observe sentinel and append next PAGE_SIZE
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setItemsToShow((prev: Viagem[]) => {
          if (prev.length >= viagensFiltradas.length) return prev;
          const nextCount = Math.min(prev.length + PAGE_SIZE, viagensFiltradas.length);
          return viagensFiltradas.slice(0, nextCount);
        });
      }
    }, { root: null, rootMargin: '300px', threshold: 0.1 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [sentinelRef, viagensFiltradas.length]);

  // Header adaptado para mobile
  const [scroll_do_user, setScroll_do_user] = useState<boolean>(false);
  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY;
          setScroll_do_user(scroll > 105);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  function ativarPesquisa() {
    window.document.getElementById('searchViagem')?.classList.toggle('ativado');
    setPesquisaAtiva((valorAtual) => !valorAtual);
  }

  function expandirMargem() {
    window.document.getElementById('container')?.classList.toggle('menu-lateral-expandido');
    window.document.getElementById('header')?.classList.toggle('menu-lateral-expandido');
    setMenuExpandidoH1(!menuExpandidoH1);
  }

  function formatarString(texto: string) {
    return texto
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");
  }

  function scrollToHeader() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  

return (
  <div id="body" className="viagens-baratas-screen">
    {largura >= 1024 ? (
      <MenuLateral expandirMargem={expandirMargem}/>
    ) : 
    (
      <MenuVertical />
    )
    }
    <header id="header" className="viagens-baratas-screen">
      {/* Filtros */}
      {largura >= 1024 && !menuExpandidoH1 && (
        <h1 className="viagens-baratas-screen">ViaJour</h1>
      )}
      <h1 className={`titulo viagens-baratas-screen ${largura < 1024 && scroll_do_user ? 'sumir' : 'aparecer'}`}>
        🏷️ Viagens Baratas
        <p className="subtitulo viagens-baratas-screen">
          Explore destinos incríveis e com um preço que cabe no seu bolso. Previsão de custo para 7 dias.
        </p>
      </h1>
      <div className="filtros viagens-baratas-screen">
        <div onMouseLeave={() => {
          if (largura >= 1024) {
            if (pesquisaAtiva) {ativarPesquisa()}
          } else return;
          }}
          style={{backgroundColor: pesquisaAtiva ? '#f59e0b' : ''}} className="filtro-busca viagens-baratas-screen">
          <input onChange={(event) => {
            scrollToHeader();
            const textoDigitado = event.target.value;
            const textoFormatado = formatarString(textoDigitado);
            setPesquisaAtual(textoFormatado)}} placeholder="Feliz Natal!" type="text" className="viagens-baratas-screen" name="searchViagem" id="searchViagem"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                ativarPesquisa();
              }
            }} />
          
          {!pesquisaAtiva && (
          <>
            <button
              id="btn-viagem-internacional"
              onClick={() => {setFiltro("internacional"); scrollToHeader()}}
              className={`btn-filtro ${filtro === "internacional" ? "btn-ativo" : ""} viagens-baratas-screen`}
            >
              Viagens internacionais
            </button>
            <hr id="hr-btn-viagem" className="hr-vertical viagens-baratas-screen" />
            <button
              id="btn-viagem-nacional"
              onClick={() => {setFiltro("nacional"); scrollToHeader()}}
              className={`btn-filtro ${filtro === "nacional" ? "btn-ativo" : ""} viagens-baratas-screen`}
            >
              Viagens nacionais
            </button>
          </>
          )}

          <div onMouseEnter={() => {
            if (largura >= 1024) {
              if (!pesquisaAtiva) {ativarPesquisa()} 
            } else return;
            }}
            onClick={() => {
              if (largura < 1024) {
                ativarPesquisa(); 
              } else return;
            }}
            className="icone viagens-baratas-screen">
            <i className="fa-solid fa-magnifying-glass viagens-baratas-screen"></i>
            </div>
        </div>

        <div className="filtro-preco viagens-baratas-screen">
          <div className="custo-estimado viagens-baratas-screen">
            <h2>Custo estimado</h2>
            <h3>R$ {value[0]} - {value[1]} </h3>
          </div>
          <SliderCustomizado step={100} value={value} onChange={(_, newValue) => {
             if (Array.isArray(newValue)) {
              setValue(newValue);
              scrollToHeader();
             } else return;
             }} 
            valueLabelDisplay="auto" min={0} max={filtro === 'nacional' ? 4000 : 10000} />
        </div>
      </div>
    </header>
    
    <main id="container" className="pagina-natal viagens-baratas-screen">
      {/* Cards */}
      <div className="lista-viagens viagens-baratas-screen">
        {itemsToShow.map((v) => (
          <div
            key={v.id}
            className="card-viagem viagens-baratas-screen"
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.destino}
                className="card-img viagens-baratas-screen"
              />
            )}
            <div className="card-info viagens-baratas-screen">
              <div className="viagens-baratas-screen">
                <h2 className="card-titulo viagens-baratas-screen">{v.destino}</h2>
                <p className="card-descricao viagens-baratas-screen">{v.descricao}</p>
                <p className="card-custo viagens-baratas-screen">
                  Custo estimado (7 dias):{" "}
                  <span className="viagens-baratas-screen">{v.custo}</span>
                </p>
              </div>
              <span className="tag-natalina viagens-baratas-screen">
                {v.tipo}
              </span>
            </div>
          </div>
        ))}
        {/* sentinel for infinite scroll */}
        <div ref={sentinelRef} style={{height: 1}} aria-hidden />

        {/* loader / status */}
        {itemsToShow.length < viagensFiltradas.length ? (
          <div className="loader-carregando viagens-baratas-screen">Carregando mais viagens...</div>
        ) : (
          <div className="loader-fim viagens-baratas-screen">{itemsToShow.length === 0 ? 'Nenhuma viagem encontrada' : 'Você chegou ao fim'}</div>
        )}
      </div>
    </main>
    
    {largura >= 1024 && (
      <AnuncioDesktop/>
    )}

  </div>
);

}
