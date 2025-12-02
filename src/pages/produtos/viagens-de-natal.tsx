import { useState, useEffect, useRef, useMemo } from "react";
import '../../styles/produtos/viagens-de-natal.css';
import MenuLateral from "../../components/menu-lateral";
import anuncio from '../../assets/imagens/anuncio1.png';
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
    descricao: "Praças iluminadas, feiras natalinas e muito chocolate quente nas montanhas gaúchas.",
    keywords: ["Gramado - RS", "viagem de natal", "Gramado", "Rio Grande do Sul", "serra gaúcha", "praças iluminadas", "feiras natalinas", "chocolate quente"],
  },
  {
    id: 2,
    destino: "Penedo - RJ",
    custo: "R$ 4.100",
    custoBruto: 4100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2020/12/20/10/01/christmas-tree-5846564_1280.jpg",
    descricao: "Clima europeu no Brasil: muita decoração, pousadas aconchegantes e comidas típicas.",
    keywords: ["Penedo - RJ", "viagem de natal", "Penedo", "Rio de Janeiro", "clima europeu", "pousadas aconchegantes", "comidas típicas", "destino romântico"],
  },
  {
    id: 3,
    destino: "Curitiba - PR",
    custo: "R$ 3.600",
    custoBruto: 3600,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/11/24/02/05/christmas-lights-3834926_1280.jpg",
    descricao: "Iluminações, mercados e restaurantes especiais para celebrar o Natal em família.",
    keywords: ["Curitiba - PR", "viagem de natal", "Curitiba", "Paraná", "iluminações natalinas", "mercados de natal", "restaurantes especiais", "cidade verde"],
  },
  {
    id: 4,
    destino: "Nova York - EUA",
    custo: `US$ 2.900 ou R$ ${(2900*5.3)}`,
    custoBruto: 2900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/12/29/19/19/marketplace-4727905_1280.jpg",
    descricao: "Natal nas ruas de Manhattan: shows, patinação no gelo e vitrines icônicas.",
    keywords: ["Nova York - EUA", "viagem de natal", "Nova York", "Manhattan", "patinação no gelo", "vitrines icônicas", "shows de natal", "Rockefeller"],
  },
  {
    id: 5,
    destino: "Disneylândia - EUA",
    custo: `US$ 3.400 ou R$ ${(3400*5.3)}`,
    custoBruto: 3400*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/08/29/09/26/disney-2692578_1280.jpg",
    descricao: "Magia total: espetáculos temáticos, desfiles e momentos com personagens para todas as idades.",
    keywords: ["Disneylândia - EUA", "viagem de natal", "Disneylândia", "Disney", "Mickey", "Magic Kingdom", "personagens", "desfiles", "parque temático", "viagem em família"]
  },
  {
    id: 6,
    destino: "Viena - Áustria",
    custo: `€ 2.500 ou R$ ${(2500*6.2)}`,
    custoBruto: 2500*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/01/24/16/29/horses-6963914_1280.jpg",
    descricao: "Mercados tradicionais, concertos natalinos e atmosfera clássica europeia.",
    keywords: ["Viena - Áustria", "viagem de natal", "Viena", "Áustria", "mercados natalinos", "concertos natalinos", "atmosfera clássica", "Natal europeu"],
  },
  {
    id: 7,
    destino: "Campos do Jordão - SP",
    custo: "R$ 2.800",
    custoBruto: 2800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/10/29/prague-7171444_1280.jpg",
    descricao: "Clima de serra, chocolates, fondue e ruas enfeitadas — perfeito para um Natal romântico.",
    keywords: ["Campos do Jordão - SP", "viagem de natal", "Campos do Jordão", "São Paulo", "serra", "chocolates", "fondue", "clima de serra", "Natal romântico"],
  },
  {
    id: 8,
    destino: "Bonito - MS",
    custo: "R$ 3.200",
    custoBruto: 3200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/11/18/18/35/hamburg-3823819_1280.jpg",
    descricao: "Natureza exuberante, rios cristalinos e passeios outdoor para relaxar no Natal.",
    keywords: ["Bonito - MS", "viagem de natal", "Bonito", "Mato Grosso do Sul", "rios cristalinos", "natureza exuberante", "passeios outdoor", "ecoturismo"],
  },
  {
    id: 9,
    destino: "Foz do Iguaçu - PR",
    custo: "R$ 2.900",
    custoBruto: 2900,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/09/07/02/25/city-4457801_1280.jpg",
    descricao: "Cataratas imponentes e vistas espetaculares, ideal para quem busca aventura e natureza.",
    keywords: ["Foz do Iguaçu - PR", "viagem de natal", "Foz do Iguaçu", "Paraná", "Cataratas do Iguaçu", "aventura", "natureza", "Parque Nacional"],
  },
  {
    id: 10,
    destino: "Natal - RN",
    custo: "R$ 2.400",
    custoBruto: 2400,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/12/15/14/55/czech-republic-4697278_1280.jpg",
    descricao: "Praias e clima tropical, perfeito para um Natal com mar e tranquilidade.",
    keywords: ["Natal - RN", "viagem de natal", "Natal", "Rio Grande do Norte", "praias", "clima tropical", "mar", "tranquilidade"],
  },
  {
    id: 11,
    destino: "Salvador - BA",
    custo: "R$ 2.700",
    custoBruto: 2700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/11/21/20/34/philadelphia-4643451_1280.jpg",
    descricao: "Cultura e festas com alto astral, saboreie a culinária baiana durante as festas.",
    keywords: ["Salvador - BA", "viagem de natal", "Salvador", "Bahia", "cultura", "festas", "culinária baiana", "alta energia"],
  },
  {
    id: 12,
    destino: "Manaus - AM",
    custo: "R$ 3.100",
    custoBruto: 3100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/02/10/00/37/santiago-263235_1280.jpg",
    descricao: "Explore a floresta amazônica, cruzeiros e experiências culturais únicas no Natal.",
    keywords: ["Manaus - AM", "viagem de natal", "Manaus", "Amazonas", "floresta amazônica", "cruzeiros", "experiências culturais", "Amazônia"],
  },
  {
    id: 13,
    destino: "Fernando de Noronha - PE",
    custo: "R$ 6.800",
    custoBruto: 6800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/05/31/04/59/cities-3443208_1280.jpg",
    descricao: "Ilhas paradisíacas com praias de água cristalina – o Natal ideal para quem ama mar e tranquilidade.",
    keywords: ["Fernando de Noronha - PE", "viagem de natal", "Fernando de Noronha", "Pernambuco", "ilhas paradisíacas", "praias de água cristalina", "mergulho", "natureza marinha"],
  },
  {
    id: 14,
    destino: "Morro de São Paulo - BA",
    custo: "R$ 3.500",
    custoBruto: 3500,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/10/25/09/09/city-4576421_1280.jpg",
    descricao: "Praias calmas e festas locais, ótimo destino para descansar e curtir com amigos.",
    keywords: ["Morro de São Paulo - BA", "viagem de natal", "Morro de São Paulo", "Bahia", "praias calmas", "festas locais", "descansar", "ilhas"]
  },
  {
    id: 15,
    destino: "Lisboa - Portugal",
    custo: `€ 1.200 ou R$ ${(1200*6.2)}`,
    custoBruto: 1200*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2014/11/21/17/23/new-york-540807_1280.jpg",
    descricao: "Ruas históricas e iluminação mágica: descubra tradições natalinas em bairros pitorescos.",
    keywords: ["Lisboa - Portugal", "viagem de natal", "Lisboa", "Portugal", "ruas históricas", "iluminação mágica", "tradições natalinas", "bairro pitoresco"],
  },
  {
    id: 16,
    destino: "Paris - França",
    custo: `€ 1.600 ou R$ ${(1600*6.2)}`,
    custoBruto: 1600*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/10/30/15/21/travel-2902737_1280.jpg",
    descricao: "Mercados encantadores, cafés e vitrines decoradas — um Natal cheio de charme europeu.",
    keywords: ["Paris - França", "viagem de natal", "Paris", "França", "mercados encantadores", "cafés", "vitrines decoradas", "charme europeu"],
  },
  {
    id: 17,
    destino: "Londres - Reino Unido",
    custo: `£ 1.400 ou R$ ${(1400*7)}`,
    custoBruto: 1400*7,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/10/15/12/50/prague-5656740_1280.jpg",
    descricao: "Tradição, teatros e rotas históricas — perfeito para celebrar o Natal com cultura e estilo.",
    keywords: ["Londres - Reino Unido", "viagem de natal", "Londres", "Reino Unido", "teatros", "tradição", "rotas históricas", "Natal cultural"],
  },
  {
    id: 18,
    destino: "Tóquio - Japão",
    custo: `¥ 330.000 ou R$ ${(330000*0.03)}`,
    custoBruto: 330000*0.03,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/04/04/17/58/road-4103334_1280.jpg",
    descricao: "Iluminações moderníssimas, delícias culinárias e experiências urbanas únicas no Natal.",
    keywords: ["Tóquio - Japão", "viagem de natal", "Tóquio", "Japão", "iluminações moderníssimas", "culinária japonesa", "experiências urbanas"],
  },
  {
    id: 19,
    destino: "Sydney - Austrália",
    custo: `US$ 3.900 ou R$ ${(3900*5.3)}`,
    custoBruto: 3900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2013/12/28/13/14/sidney-234714_1280.jpg",
    descricao: "Natal de verão: praias, eventos ao ar livre e fogos de artifício à beira-mar.",
    keywords: ["Sydney - Austrália", "viagem de natal", "Sydney", "Austrália", "Natal de verão", "praias", "fogos de artifício", "events ao ar livre"],
  },
  {
    id: 20,
    destino: "Bali - Indonésia",
    custo: `US$ 1.900 ou R$ ${(1900*5.3)}`,
    custoBruto: 1900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/08/29/21/39/snow-2694971_1280.jpg",
    descricao: "Relaxamento em praias tropicais, templos e resorts perfeitos para celebrar com calma.",
    keywords: ["Bali - Indonésia", "viagem de natal", "Bali", "Indonésia", "praias tropicais", "templos", "resorts", "relaxamento"],
  },
  {
    id: 21,
    destino: "Cidade do Cabo - África do Sul",
    custo: `US$ 1.350 ou R$ ${(3900*5.3)}`,
    custoBruto: 1350*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/05/31/20/02/city-view-1427730_1280.jpg",
    descricao: "Paisagens costeiras deslumbrantes, vinhos regionais e uma combinação de cultura e natureza.",
    keywords: ["Cidade do Cabo - África do Sul", "viagem de natal", "Cidade do Cabo", "África do Sul", "paisagens costeiras", "vinhos regionais", "natureza"],
  },
  {
    id: 22,
    destino: "Reykjavik - Islândia",
    custo: `€ 2.000 ou R$ ${(2000*6.2)}`,
    custoBruto: 2000*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2013/10/04/21/13/san-diego-190898_1280.jpg",
    descricao: "Auroras boreais, paisagens geladas e vilarejos pitorescos para um Natal mágico.",
    keywords: ["Reykjavik - Islândia", "viagem de natal", "Reykjavik", "Islândia", "auroras boreais", "paisagens geladas", "vilarejos pitorescos", "turismo de inverno"],
  },
  {
    id: 23,
    destino: "Vancouver - Canadá",
    custo: `US$ 2.100 ou R$ ${(2000*5.3)}`,
    custoBruto: 2100*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/08/10/19/11/los-angeles-1584089_1280.jpg",
    descricao: "Montanhas nevadas próximas e uma cidade vibrante — perfeito para combinar esqui e urbanismo.",
    keywords: ["Vancouver - Canadá", "viagem de natal", "Vancouver", "Canadá", "montanhas nevadas", "esqui", "cidade vibrante", "urbanismo + natureza"],
  },
  {
    id: 24,
    destino: "Roma - Itália",
    custo: `€ 1.500 ou R$ ${(1500*6.2)}`,
    custoBruto: 1500*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505450_1280.jpg",
    descricao: "História, gastronomia e presépios nas praças — um Natal cercado por arte e tradição.",
    keywords: ["Roma - Itália", "viagem de natal", "Roma", "Itália", "história", "gastronomia", "presépios", "tradição"],
  },
  {
    id: 25,
    destino: "Praga - República Tcheca",
    custo: `€ 1.100 ou R$ ${(1500*6.2)}`,
    custoBruto: 1100*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/25/19/14/paris-4793200_1280.jpg",
    descricao: "Mercados medievais, praças iluminadas e charme arquitetônico para um Natal inesquecível.",
    keywords: ["Praga - República Tcheca", "viagem de natal", "Praga", "República Tcheca", "mercados medievais", "praças iluminadas", "charme arquitetônico"],
  },
  {
    id: 26,
    destino: "Dubai - Emirados Árabes",
    custo: `US$ 2.400 ou R$ ${(2400*5.3)}`,
    custoBruto: 2400*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/03/11/14/32/burj-khalifa-4922317_1280.jpg",
    descricao: "Luxo, grandes shoppings e eventos modernos — um Natal com experiências exclusivas.",
    keywords: ["Dubai - Emirados Árabes", "viagem de natal", "Dubai", "Emirados Árabes", "luxo", "grandes shoppings", "experiências exclusivas", "Natal moderno"],
  },
  {
    id: 27,
    destino: "Belo Horizonte - MG",
    custo: "R$ 2.100",
    custoBruto: 2100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2025/07/16/10/33/rice-9717641_1280.jpg",
    descricao: "Gastronomia e arquitetura colonial — uma mistura cultural perfeita para o Natal.",
    keywords: ["Belo Horizonte - MG", "viagem de natal", "Belo Horizonte", "Minas Gerais", "gastronomia", "arquitetura colonial"],
  },
  {
    id: 28,
    destino: "Ilhéus - BA",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2023/12/06/17/17/street-8434099_1280.jpg",
    descricao: "Praias e história literária — um Natal praiano com charme e tranquilidade.",
    keywords: ["Ilhéus - BA", "viagem de natal", "Ilhéus", "Bahia", "praias", "história literária"],
  },
  {
    id: 29,
    destino: "Mendoza - Argentina",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2023/07/12/18/21/croatia-8123037_1280.jpg",
    descricao: "Vinhedos e paisagens andinas — perfeito para um Natal tranquilo entre vinhos e montanhas.",
    keywords: ["Mendoza - Argentina", "viagem de natal", "Mendoza", "Argentina", "vinhedos", "Andes"],
  },
  {
    id: 30,
    destino: "Berlim - Alemanha",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/05/08/11/24/city-6238228_1280.jpg",
    descricao: "Mercados de Natal famosos, iluminação e muita história — uma cidade viva no Natal.",
    keywords: ["Berlim - Alemanha", "viagem de natal", "Berlim", "Alemanha", "mercados de natal", "história"],
  },
  {
    id: 31,
    destino: "Nuremberg - Alemanha",
    custo: `€ 1.100 ou R$ ${(1100*6.2)}`,
    custoBruto: 1100*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/06/18/21/40/strasbourg-7270721_1280.jpg",
    descricao: "Um dos mercados de Natal mais tradicionais do mundo — atmosfera medieval e quitutes típicos.",
    keywords: ["Nuremberg - Alemanha", "viagem de natal", "Nuremberg", "Alemanha", "mercado de natal", "tradição"],
  },
  {
    id: 32,
    destino: "Edimburgo - Escócia",
    custo: `£ 1.100 ou R$ ${(1100*7)}`,
    custoBruto: 1100*7,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/04/22/20/54/assisi-city-7150611_1280.jpg",
    descricao: "Ruas históricas, festivais e um clima acolhedor — Natal com tradição celta e mercados artesanais.",
    keywords: ["Edimburgo - Escócia", "viagem de natal", "Edimburgo", "Escócia", "festivais", "mercados artesanais"],
  },
  {
    id: 33,
    destino: "Sevilha - Espanha",
    custo: `€ 900 ou R$ ${(900*6.2)}`,
    custoBruto: 900*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/11/24/10/00/city-5772040_1280.jpg",
    descricao: "Clima ameno, feiras de artesanato e celebrações locais — Natal com charme andaluz.",
    keywords: ["Sevilha - Espanha", "viagem de natal", "Sevilha", "Espanha", "andaluz", "feiras de artesanato"],
  },
  {
    id: 34,
    destino: "Santorini - Grécia",
    custo: `€ 1.700 ou R$ ${(1700*6.2)}`,
    custoBruto: 1700*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/12/14/16/15/city-6870803_1280.jpg",
    descricao: "Ilhas brancas e pores do sol inesquecíveis — um Natal romântico em paisagens deslumbrantes.",
    keywords: ["Santorini - Grécia", "viagem de natal", "Santorini", "Grécia", "ilhas", "pôr do sol", "romântico"],
  },
  {
    id: 35,
    destino: "Göteborg - Suécia",
    custo: `€ 1.050 ou R$ ${(1050*6.2)}`,
    custoBruto: 1050*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/02/27/20/57/building-4885833_1280.jpg",
    descricao: "Mercados aconchegantes, decoração e gastronomia nórdica — um Natal escandinavo autêntico.",
    keywords: ["Göteborg - Suécia", "viagem de natal", "Göteborg", "Suécia", "mercados", "nórdico"],
  },
  {
    id: 36,
    destino: "Zermatt - Suíça",
    custo: `CHF 1.800 ou R$ ${(1800*5.8)}`,
    custoBruto: 1800*5.8,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525_1280.jpg",
    descricao: "Montanhas nevadas, chalés e esqui — Natal alpino perfeito para quem busca neve.",
    keywords: ["Zermatt - Suíça", "viagem de natal", "Zermatt", "Suíça", "neve", "esqui", "chalés"],
  },
  {
    id: 37,
    destino: "Recife - PE",
    custo: "R$ 2.200",
    custoBruto: 2200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/01/30/18/07/salzburg-5964812_1280.jpg",
    descricao: "Praias urbanas, centros históricos e culinária pernambucana para um Natal animado.",
    keywords: ["Recife - PE", "viagem de natal", "Recife", "Pernambuco", "praias", "centro histórico", "culinária"],
  },
  {
    id: 38,
    destino: "Florianópolis - SC",
    custo: "R$ 2.400",
    custoBruto: 2400,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2016/11/23/15/32/pedestrians-1853552_1280.jpg",
    descricao: "Praias variadas e vida noturna — ótima combinação para um Natal descontraído.",
    keywords: ["Florianópolis - SC", "viagem de natal", "Floripa", "Santa Catarina", "praias", "ilha"],
  },
  {
    id: 39,
    destino: "Ouro Preto - MG",
    custo: "R$ 1.800",
    custoBruto: 1800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/07/23/11/38/switzerland-6487204_1280.jpg",
    descricao: "Ruas históricas e decoração colonial — Natal com tradição e espírito cultural.",
    keywords: ["Ouro Preto - MG", "viagem de natal", "Ouro Preto", "Minas Gerais", "história", "arquitetura"],
  },
  {
    id: 40,
    destino: "Porto Seguro - BA",
    custo: "R$ 2.300",
    custoBruto: 2300,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/06/17/05/14/city-6342765_1280.jpg",
    descricao: "Praias e festas de fim de ano — um Natal praiano com clima de celebração.",
    keywords: ["Porto Seguro - BA", "viagem de natal", "Porto Seguro", "Bahia", "praias", "festa"],
  },
  {
    id: 41,
    destino: "Chapada Diamantina - BA",
    custo: "R$ 3.000",
    custoBruto: 3000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/20/09/prague-7172594_1280.jpg",
    descricao: "Cachoeiras, trilhas e natureza exuberante — Natal para quem busca aventura e contato com a natureza.",
    keywords: ["Chapada Diamantina - BA", "viagem de natal", "Chapada Diamantina", "Bahia", "cachoeiras", "trilhas"],
  },
  {
    id: 42,
    destino: "Buenos Aires - Argentina",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/11/29/12/16/buildings-1869425_1280.jpg",
    descricao: "Cultura, tango e gastronomia — um Natal com charme porteño e noites animadas.",
    keywords: ["Buenos Aires - Argentina", "viagem de natal", "Buenos Aires", "Argentina", "tango", "gastronomia"],
  },
  {
    id: 43,
    destino: "Amsterdam - Holanda",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/07/03/16/42/amsterdam-5367020_1280.jpg",
    descricao: "Canais iluminados, mercados e design — um Natal europeu com charme informal.",
    keywords: ["Amsterdam - Holanda", "viagem de natal", "Amsterdam", "Holanda", "canais", "mercados"],
  },
  {
    id: 44,
    destino: "Barcelona - Espanha",
    custo: `€ 1.150 ou R$ ${(1150*6.2)}`,
    custoBruto: 1150*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/03/09/13/45/dubai-4044183_1280.jpg",
    descricao: "Arquitetura de Gaudí, clima ameno e mercados locais — um Natal vibrante à beira-mar.",
    keywords: ["Barcelona - Espanha", "viagem de natal", "Barcelona", "Espanha", "Gaudí", "mercados"],
  },
  {
    id: 45,
    destino: "Hong Kong - China",
    custo: `US$ 1.700 ou R$ ${(1700*5.3)}`,
    custoBruto: 1700*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/02/20/13/25/city-4864747_1280.jpg",
    descricao: "Arranha-céus iluminados, mercados noturnos e sabores variados — Natal cosmopolita e moderno.",
    keywords: ["Hong Kong - China", "viagem de natal", "Hong Kong", "China", "mercados noturnos", "arranha-céus"],
  },
  {
    id: 46,
    destino: "Montreal - Canadá",
    custo: `US$ 1.600 ou R$ ${(1600*5.3)}`,
    custoBruto: 1600*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2014/08/26/14/11/cathedral-427997_1280.jpg",
    descricao: "Mercados de inverno, arquitetura e clima frio — um Natal aconchegante com toque francês.",
    keywords: ["Montreal - Canadá", "viagem de natal", "Montreal", "Canadá", "mercados de inverno", "clima frio"],
  },
  {
    id: 47,
    destino: "João Pessoa - PB",
    custo: "R$ 1.900",
    custoBruto: 1900,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2020/04/11/14/42/street-5030692_1280.jpg",
    descricao: "Praias tranquilas e clima aconchegante para curtir o Natal em família.",
    keywords: ["João Pessoa - PB", "viagem de natal", "João Pessoa", "Paraíba", "praias", "litoral norte"],
  },
  {
    id: 48,
    destino: "Arraial do Cabo - RJ",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/12/03/20/59/town-6843799_1280.jpg",
    descricao: "Águas cristalinas e passeios de barco — Natal perfeito para mergulho e praias.",
    keywords: ["Arraial do Cabo - RJ", "viagem de natal", "Arraial do Cabo", "Rio de Janeiro", "praias", "mergulho"],
  },
  {
    id: 49,
    destino: "Búzios - RJ",
    custo: "R$ 2.350",
    custoBruto: 2350,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/08/27/14/29/stone-building-7414577_1280.jpg",
    descricao: "Praias charmosas e vida noturna animada — Natal sofisticado à beira-mar.",
    keywords: ["Búzios - RJ", "viagem de natal", "Búzios", "Rio de Janeiro", "praias", "vida noturna"],
  },
  {
    id: 50,
    destino: "Paraty - RJ",
    custo: "R$ 1.700",
    custoBruto: 1700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/01/18/18/10/mountain-6947848_1280.jpg",
    descricao: "Centro histórico, ruas de pedra e paisagens costeiras — Natal cultural e tranquilo.",
    keywords: ["Paraty - RJ", "viagem de natal", "Paraty", "Rio de Janeiro", "histórico", "centro colonial"],
  },
  {
    id: 51,
    destino: "Porto de Galinhas - PE",
    custo: "R$ 2.350",
    custoBruto: 2350,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/10/02/01/40/town-469252_1280.jpg",
    descricao: "Piscinas naturais e praias famosas — ótima pedida para um Natal de mar e sol.",
    keywords: ["Porto de Galinhas - PE", "viagem de natal", "Porto de Galinhas", "Pernambuco", "piscinas naturais", "praias"],
  },
  {
    id: 52,
    destino: "Seul - Coreia do Sul",
    custo: `US$ 1.700 ou R$ ${(1700*5.3)}`,
    custoBruto: 1700*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/02/11/34/lavaux-6763006_1280.jpg",
    descricao: "Cultura pop, tecnologia e luzes — um Natal urbano e vibrante na Ásia.",
    keywords: ["Seul - Coreia do Sul", "viagem de natal", "Seul", "Coreia do Sul", "cultura pop", "tecnologia"],
  },
  {
    id: 53,
    destino: "Auckland - Nova Zelândia",
    custo: `US$ 2.400 ou R$ ${(2400*5.3)}`,
    custoBruto: 2400*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/13/12/33/vineyards-6791178_1280.jpg",
    descricao: "Paisagens naturais e praias únicas — Natal no Hemisfério Sul com sol e mar.",
    keywords: ["Auckland - Nova Zelândia", "viagem de natal", "Auckland", "Nova Zelândia", "paisagens naturais", "ilhas"],
  },
  {
    id: 54,
    destino: "Marrakech - Marrocos",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2018/01/20/10/14/architecture-3094199_1280.jpg",
    descricao: "Mercados, cores e palácios — um Natal exótico entre medinas e arquitetura histórica.",
    keywords: ["Marrakech - Marrocos", "viagem de natal", "Marrakech", "Marrocos", "medina", "mercados"],
  },
  {
    id: 55,
    destino: "Kuala Lumpur - Malásia",
    custo: `US$ 1.350 ou R$ ${(1350*5.3)}`,
    custoBruto: 1350*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/11/14/04/24/buffalo-1822581_1280.jpg",
    descricao: "Cultura multicultural, arranha-céus e sabores asiáticos — Natal cosmopolita na Malásia.",
    keywords: ["Kuala Lumpur - Malásia", "viagem de natal", "Kuala Lumpur", "Malásia", "multicultural", "culinária"],
  },
  {
    id: 56,
    destino: "Santiago - Chile",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/12/11/11/08/mountain-6862538_1280.jpg",
    descricao: "Cenário andino e bons vinhos — Natal com gastronomia e paisagens próximas às montanhas.",
    keywords: ["Santiago - Chile", "viagem de natal", "Santiago", "Chile", "Andes", "vinhos"],
  },
  {
    id: 57,
    destino: "Maceió - AL",
    custo: "R$ 1.950",
    custoBruto: 1950,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/10/25/16/33/town-6741493_1280.jpg",
    descricao: "Praias de águas cristalinas e piscinas naturais — Natal relaxante com sol e mar.",
    keywords: ["Maceió - AL", "viagem de natal", "Maceió", "Alagoas", "praias", "piscinas naturais"],
  },
  {
    id: 58,
    destino: "São Luís - MA",
    custo: "R$ 1.700",
    custoBruto: 1700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/05/18/19/19/botanical-347384_1280.jpg",
    descricao: "Centro histórico, cultura riquíssima e praias na costa maranhense — Natal cultural.",
    keywords: ["São Luís - MA", "viagem de natal", "São Luís", "Maranhão", "centro histórico", "cultura"],
  },
  {
    id: 59,
    destino: "Belém - PA",
    custo: "R$ 1.800",
    custoBruto: 1800,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2015/12/06/15/17/portugal-1079586_1280.jpg",
    descricao: "Sabores amazônicos, mercados e natureza próxima — Natal com sabores e tradições locais.",
    keywords: ["Belém - PA", "viagem de natal", "Belém", "Pará", "mercados", "culinária amazônica"],
  },
  {
    id: 60,
    destino: "Vitória - ES",
    custo: "R$ 1.650",
    custoBruto: 1650,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/05/30/11/57/vitoria-3441335_1280.jpg",
    descricao: "Praias urbanas e ilhas próximas — um Natal tranquilo com boa gastronomia litorânea.",
    keywords: ["Vitória - ES", "viagem de natal", "Vitória", "Espírito Santo", "praias", "ilhas"],
  },
  {
    id: 61,
    destino: "Campo Grande - MS",
    custo: "R$ 1.500",
    custoBruto: 1500,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/10/12/05/50/lighthouse-6702434_1280.jpg",
    descricao: "Porta de entrada para o Pantanal — Natal de natureza, observação de fauna e passeios únicos.",
    keywords: ["Campo Grande - MS", "viagem de natal", "Campo Grande", "Mato Grosso do Sul", "Pantanal", "natureza"],
  },
  {
    id: 62,
    destino: "Dublin - Irlanda",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/22/18/11/town-6817089_1280.jpg",
    descricao: "Tradições, música ao vivo e pubs acolhedores — um Natal com clima informal e cultural.",
    keywords: ["Dublin - Irlanda", "viagem de natal", "Dublin", "Irlanda", "pubs", "música"],
  },
  {
    id: 63,
    destino: "Oslo - Noruega",
    custo: `€ 1.500 ou R$ ${(1500*6.2)}`,
    custoBruto: 1500*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/04/29/07/48/village-6215845_1280.jpg",
    descricao: "Mercados de inverno e paisagens nórdicas — Natal com inspiração escandinava e neve possível.",
    keywords: ["Oslo - Noruega", "viagem de natal", "Oslo", "Noruega", "mercados de inverno", "nórdico"],
  },
  {
    id: 64,
    destino: "Helsinque - Finlândia",
    custo: `€ 1.200 ou R$ ${(1200*6.2)}`,
    custoBruto: 1200*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2023/05/05/06/19/street-7971714_1280.jpg",
    descricao: "Arquitetura moderna, mercados e proximidade com paisagens geladas — Natal elegante e frio.",
    keywords: ["Helsinque - Finlândia", "viagem de natal", "Helsinque", "Finlândia", "mercados", "neve"],
  },
  {
    id: 65,
    destino: "Bangkok - Tailândia",
    custo: `US$ 1.300 ou R$ ${(1300*5.3)}`,
    custoBruto: 1300*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/03/27/14/32/rotterdam-7095262_1280.jpg",
    descricao: "Templos iluminados, mercados e gastronomia vibrante — Natal exótico e cheio de sabores.",
    keywords: ["Bangkok - Tailândia", "viagem de natal", "Bangkok", "Tailândia", "templos", "mercados"],
  },
  {
    id: 66,
    destino: "Istambul - Turquia",
    custo: `US$ 1.150 ou R$ ${(1150*5.3)}`,
    custoBruto: 1150*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/16/06/50/town-6800271_1280.jpg",
    descricao: "Cruzar continentes entre Europa e Ásia, bazares e muita história — Natal cultural e vibrante.",
    keywords: ["Istambul - Turquia", "viagem de natal", "Istambul", "Turquia", "bazar", "história"],
  },
  {
    id: 67,
    destino: "Jericoacoara - CE",
    custo: "R$ 2.100",
    custoBruto: 2100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2017/04/26/19/28/the-national-library-2263515_1280.jpg",
    descricao: "Dunas, lagoas e um pôr do sol famoso — Natal perfeito para quem busca praia e vento para praticar esportes náuticos.",
    keywords: ["Jericoacoara - CE", "viagem de natal", "Jericoacoara", "Ceará", "dunas", "lagoas", "esportes náuticos"],
  },
  {
    id: 68,
    destino: "Maragogi - AL",
    custo: "R$ 2.200",
    custoBruto: 2200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/07/03/22/11/arapongas-3514905_1280.jpg",
    descricao: "Piscinas naturais e águas cristalinas — Natal com mergulho e descanso em praias paradisíacas.",
    keywords: ["Maragogi - AL", "viagem de natal", "Maragogi", "Alagoas", "piscinas naturais", "mergulho"],
  },
  {
    id: 69,
    destino: "Pipa - RN",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/02/09/03/57/brazil-5997313_1280.jpg",
    descricao: "Praias com falésias e vida noturna charmosa — Natal descontraído e com ótimas opções de lazer.",
    keywords: ["Pipa - RN", "viagem de natal", "Pipa", "Rio Grande do Norte", "falésias", "praias"],
  },
  {
    id: 70,
    destino: "Lençóis Maranhenses - MA",
    custo: "R$ 3.100",
    custoBruto: 3100,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2024/08/26/23/38/maranhao-sheets-9000410_1280.jpg",
    descricao: "Paisagens únicas de dunas e lagoas — Natal para quem busca experiências naturais e fotografia memorável.",
    keywords: ["Lençóis Maranhenses - MA", "viagem de natal", "Lençóis Maranhenses", "Maranhão", "dunas", "lagoas"],
  },
  {
    id: 71,
    destino: "Canela - RS",
    custo: "R$ 2.700",
    custoBruto: 2700,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2013/08/09/05/58/kuala-lumpur-170985_1280.jpg",
    descricao: "Atmosfera serrana, atrações natalinas e natureza — Natal romântico e próximo de Gramado.",
    keywords: ["Canela - RS", "viagem de natal", "Canela", "Rio Grande do Sul", "serra", "Natal"],
  },
  {
    id: 72,
    destino: "Veneza - Itália",
    custo: `€ 1.400 ou R$ ${(1400*6.2)}`,
    custoBruto: 1400*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/08/21/17/52/bridge-1610395_1280.jpg",
    descricao: "Canais, gondolas e arquitetura histórica — Natal romântico entre praças e luzes mágicas.",
    keywords: ["Veneza - Itália", "viagem de natal", "Veneza", "Itália", "canais", "gondolas"],
  },
  {
    id: 73,
    destino: "Los Angeles - EUA",
    custo: `US$ 1.450 ou R$ ${(1450*5.3)}`,
    custoBruto: 1450*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/20/05/15/car-6810885_1280.jpg",
    descricao: "Praias, entretenimento e cultura pop — Natal com clima ameno e atividades para toda a família.",
    keywords: ["Los Angeles - EUA", "viagem de natal", "Los Angeles", "EUA", "entretenimento", "praias"],
  },
  {
    id: 74,
    destino: "Nova Délhi - Índia",
    custo: `US$ 1.100 ou R$ ${(1100*5.3)}`,
    custoBruto: 1100*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/31/14/27/taj-mahal-sunset-4808233_1280.jpg",
    descricao: "Mercados vibrantes, monumentos históricos e culinária rica — Natal repleto de cultura e cores.",
    keywords: ["Nova Délhi - Índia", "viagem de natal", "Délhi", "Índia", "mercados", "história"],
  },
  {
    id: 75,
    destino: "Singapura - Singapura",
    custo: `US$ 1.300 ou R$ ${(1300*5.3)}`,
    custoBruto: 1300*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/04/19/15/35/tower-4139724_1280.jpg",
    descricao: "Cidade-jardim, iluminação e gastronomia cosmopolita — Natal moderno e confortável na Ásia.",
    keywords: ["Singapura - Singapura", "viagem de natal", "Singapura", "cidade-jardim", "gastronomia"],
  },
  {
    id: 76,
    destino: "Madri - Espanha",
    custo: `€ 1.000 ou R$ ${(1000*6.2)}`,
    custoBruto: 1000*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/07/27/16/52/belgium-6497401_1280.jpg",
    descricao: "Praças iluminadas, mercados e tradição — Natal espanhol com muito sabor e cultura local.",
    keywords: ["Madri - Espanha", "viagem de natal", "Madri", "Espanha", "mercados", "praças iluminadas"],
  },
  {
    id: 77,
    destino: "Ilhabela - SP",
    custo: "R$ 1.950",
    custoBruto: 1950,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/03/17/13/12/ilhabela-6102274_1280.jpg",
    descricao: "Ilhas e praias preservadas — Natal com muito sol, trilhas e esportes aquáticos.",
    keywords: ["Ilhabela - SP", "viagem de natal", "Ilhabela", "São Paulo", "praias", "trilhas"],
  },
  {
    id: 78,
    destino: "Tiradentes - MG",
    custo: "R$ 1.600",
    custoBruto: 1600,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/10/12/17/19/minas-485767_1280.jpg",
    descricao: "Centro histórico preservado e gastronomia — Natal cultural e acolhedor no interior mineiro.",
    keywords: ["Tiradentes - MG", "viagem de natal", "Tiradentes", "Minas Gerais", "histórico", "gastronomia"],
  },
  {
    id: 79,
    destino: "Jalapão - TO",
    custo: "R$ 3.200",
    custoBruto: 3200,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2021/11/21/11/48/nature-6813841_1280.jpg",
    descricao: "Dunas, fervedouros e paisagens únicas — Natal de aventura em meio à natureza selvagem.",
    keywords: ["Jalapão - TO", "viagem de natal", "Jalapão", "Tocantins", "dunas", "fervedouros"],
  },
  {
    id: 80,
    destino: "São Paulo - SP",
    custo: "R$ 1.300",
    custoBruto: 1300,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2016/11/20/08/34/buildings-1842205_1280.jpg",
    descricao: "Vida urbana, cultura e festas de fim de ano — Natal com opções variadas de lazer e gastronomia.",
    keywords: ["São Paulo - SP", "viagem de natal", "São Paulo", "cidade", "cultura", "gastronomia"],
  },
  {
    id: 81,
    destino: "Guarapari - ES",
    custo: "R$ 1.850",
    custoBruto: 1850,
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/01/28/17/11/zanzibar-253862_1280.jpg",
    descricao: "Praias muito procuradas, piscinas naturais e ótima infraestrutura — Natal praiano para todas as idades.",
    keywords: ["Guarapari - ES", "viagem de natal", "Guarapari", "Espírito Santo", "praias", "piscinas naturais"],
  },
  {
    id: 82,
    destino: "Bruxelas - Bélgica",
    custo: `€ 1.150 ou R$ ${(1150*6.2)}`,
    custoBruto: 1150*6.2,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/11/07/21/17/feldkirch-7577247_1280.jpg",
    descricao: "Praças, chocolate e mercados de inverno — Natal com charme e história europeia.",
    keywords: ["Bruxelas - Bélgica", "viagem de natal", "Bruxelas", "Bélgica", "chocolate", "mercados"],
  },
  {
    id: 83,
    destino: "Lima - Peru",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2021/11/10/14/27/lima-6784100_1280.jpg",
    descricao: "Gastronomia renomada, centros históricos e cultura — Natal com muitos sabores e história.",
    keywords: ["Lima - Peru", "viagem de natal", "Lima", "Peru", "gastronomia", "centro histórico"],
  },
  {
    id: 84,
    destino: "Quito - Equador",
    custo: `US$ 900 ou R$ ${(900*5.3)}`,
    custoBruto: 900*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/05/18/18/57/monsaraz-5188012_1280.jpg",
    descricao: "Arquitetura colonial nas alturas dos Andes — Natal cultural com vistas panorâmicas e clima ameno.",
    keywords: ["Quito - Equador", "viagem de natal", "Quito", "Equador", "Andes", "centro histórico"],
  },
  {
    id: 85,
    destino: "Cairo - Egito",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/11/13/22/woman-4757533_1280.jpg",
    descricao: "Antigos monumentos, mercados e história milenar — Natal exótico entre pirâmides e cultura local.",
    keywords: ["Cairo - Egito", "viagem de natal", "Cairo", "Egito", "pirâmides", "história"],
  },
  {
    id: 86,
    destino: "Zanzibar - Tanzânia",
    custo: `US$ 1.600 ou R$ ${(1600*5.3)}`,
    custoBruto: 1600*5.3,
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/08/28/09/30/zebra-7416165_1280.jpg",
    descricao: "Praias exóticas e cultura costeira — Natal de sol e mar em uma ilha colorida e cheia de história.",
    keywords: ["Zanzibar - Tanzânia", "viagem de natal", "Zanzibar", "Tanzânia", "praias", "cultura costeira"],
  },
];

const SliderCustomizado = styled(Slider)({
  color: "#1d4ed8",
  height: 2.5,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    border: '2px solid #1d4ed8',
    boxShadow: '0 0 6px rgba(0,0,0,0.3)'
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#ddd'
  }
});


export default function ViagensNatal() {
  const [filtro, setFiltro] = useState<"nacional" | "internacional">("nacional");
  const [adOpen, setAdOpen] = useState(false);
  const [pesquisaAtiva, setPesquisaAtiva] = useState<boolean>(false);
  const [pesquisaAtual, setPesquisaAtual] = useState<string>('');
  const [largura, setLargura] = useState(window.innerWidth);
  const [value, setValue] = useState([1000, 10000]);
  const viagensFiltradasCusto = useMemo(() =>

    viagens.filter((v) => v.custoBruto >= value[0] && v.custoBruto <= value[1])
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

  function ativarPesquisa() {
    window.document.getElementById('searchViagem')?.classList.toggle('ativado');
    setPesquisaAtiva((valorAtual) => !valorAtual);
  }

  function expandirMargem() {
    window.document.getElementById('container')?.classList.toggle('menu-lateral-expandido');
    window.document.getElementById('header')?.classList.toggle('menu-lateral-expandido');
  }

  function formatarString(texto: string) {
    return texto
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");
  }
  

  return (
  <div id="body" className="viagens-natalinas-screen">
    <MenuLateral expandirMargem={expandirMargem}/>
    <header id="header" className="viagens-natalinas-screen">
      {/* Filtros */}
      <h1 className="viagens-natalinas-screen">ViaJour</h1>
      <h1 className="titulo viagens-natalinas-screen">
        🎄 Viagens de Natal
        <p className="subtitulo viagens-natalinas-screen">
          Explore destinos perfeitos para passar o Natal. Previsão de custo para 7 dias.
        </p>
      </h1>
      <div className="filtros viagens-natalinas-screen">
        <div onMouseLeave={() => {
          if (pesquisaAtiva) {ativarPesquisa()}}}
           style={{backgroundColor: pesquisaAtiva ? '#1d4ed8' : ''}} className="filtro-busca viagens-natalinas-screen">
          <input onChange={(event) => {
            const textoDigitado = event.target.value;
            const textoFormatado = formatarString(textoDigitado);
            setPesquisaAtual(textoFormatado)}} placeholder="Feliz Natal!" type="text" className="viagens-natalinas-screen" name="searchViagem" id="searchViagem" />
          {!pesquisaAtiva && (
          <>
            <button
              id="btn-viagem-internacional"
              onClick={() => setFiltro("internacional")}
              className={`btn-filtro ${filtro === "internacional" ? "btn-ativo" : ""} viagens-natalinas-screen`}
            >
              Viagens internacionais
            </button>
            <hr id="hr-btn-viagem" className="hr-vertical viagens-natalinas-screen" />
            <button
              id="btn-viagem-nacional"
              onClick={() => setFiltro("nacional")}
              className={`btn-filtro ${filtro === "nacional" ? "btn-ativo" : ""} viagens-natalinas-screen`}
            >
              Viagens nacionais
            </button>
          </>
          )}
          <div onMouseEnter={() => {
            if (!pesquisaAtiva) {ativarPesquisa()}}} className="icone viagens-natalinas-screen">
            <i className="fa-solid fa-magnifying-glass viagens-natalinas-screen"></i>
            </div>
        </div>

        <div className="filtro-preco viagens-natalinas-screen">
          <div className="custo-estimado viagens-natalinas-screen">
            <h2>Custo estimado</h2>
            <h3>R$ {value[0]} - {value[1]} </h3>
          </div>
          <SliderCustomizado step={100} value={value} onChange={(_, newValue) => { if (Array.isArray(newValue)) setValue(newValue)}} valueLabelDisplay="auto" min={0} max={25000} />
        </div>
      </div>
    </header>
    
    <main id="container" className="pagina-natal viagens-natalinas-screen">
      {/* Cards */}
      <div className="lista-viagens viagens-natalinas-screen">
        {itemsToShow.map((v) => (
          <div
            key={v.id}
            className="card-viagem viagens-natalinas-screen"
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.destino}
                className="card-img viagens-natalinas-screen"
              />
            )}
            <div className="card-info viagens-natalinas-screen">
              <div className="viagens-natalinas-screen">
                <h2 className="card-titulo viagens-natalinas-screen">{v.destino}</h2>
                <p className="card-descricao viagens-natalinas-screen">{v.descricao}</p>
                <p className="card-custo viagens-natalinas-screen">
                  Custo estimado (7 dias):{" "}
                  <span className="viagens-natalinas-screen">{v.custo}</span>
                </p>
              </div>
              <span className="tag-natalina viagens-natalinas-screen">
                {v.tipo}
              </span>
            </div>
          </div>
        ))}
        {/* sentinel for infinite scroll */}
        <div ref={sentinelRef} style={{height: 1}} aria-hidden />

        {/* loader / status */}
        {itemsToShow.length < viagensFiltradas.length ? (
          <div className="loader-carregando viagens-natalinas-screen">Carregando mais viagens...</div>
        ) : (
          <div className="loader-fim viagens-natalinas-screen">{itemsToShow.length === 0 ? 'Nenhuma viagem encontrada' : 'Você chegou ao fim'}</div>
        )}
      </div>
    </main>

    
    {largura >= 1024 && (
      <div style={{backgroundImage: `url(${anuncio})`}} className="imagem-desktop viagens-natalinas-screen">
      </div>
    )}

    {/* ----------------------------- */}
    {/* 🔽 ANÚNCIO EXPANSÍVEL CLONADO */}
    {/* ----------------------------- */}
    <div className={`ad-container ${!adOpen ? "open" : ""}`}>
      <div className="ad-header" onClick={() => setAdOpen(!adOpen)}>
        <span className="ad-arrow">{!adOpen ? "▼" : "▲"}</span>
      </div>

      <div className="ad-content">
        <img
          src="https://static.stands4.com/images/symbol/2848_bing-search-logo.png"
          alt="Ad"
        />
      </div>
    </div>

  </div>
);
}
