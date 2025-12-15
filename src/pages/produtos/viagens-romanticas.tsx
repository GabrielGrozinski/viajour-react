import { useState, useEffect, useRef, useMemo } from "react";
import '../../styles/produtos/viagens-romanticas.css';
import MenuLateral from "../../components/menu-lateral";
import MenuVertical from "../../components/menu-vertical";
import AnuncioDesktop from "../../components/anuncio-desktop";
import AnuncioMobile from "../../components/anuncio-mobile";
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
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Cenário europeu brasileiro com ruas charmosas, jantares à luz de velas e clima acolhedor perfeito para casais.",
    keywords: ["Gramado - RS", "viagem romântica", "serra gaúcha", "clima aconchegante", "gastronomia romântica", "casal", "montanhas"],
    img: "https://images.unsplash.com/photo-1680124309539-e9584b756022?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    destino: "Penedo - RJ",
    custo: "R$ 4.100",
    custoBruto: 4100,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Destino tranquilo e acolhedor, com pousadas intimistas, banhos relaxantes e clima europeu ideal para momentos a dois.",
    keywords: ["Penedo - RJ", "viagem romântica", "pousadas aconchegantes", "clima europeu", "casal", "refúgio romântico", "serra"],
    img: "https://images.unsplash.com/photo-1759161347014-4175aa123974?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    destino: "Curitiba - PR",
    custo: "R$ 3.600",
    custoBruto: 3600,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Ambiente urbano elegante com parques, cafés e programas culturais perfeitos para um passeio romântico.",
    keywords: ["Curitiba - PR", "viagem romântica", "cidade charmosa", "parques", "gastronomia", "clima ameno", "casal"],
    img: "https://images.unsplash.com/photo-1608932304255-f60b22e63ba3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    destino: "Nova York - EUA",
    custo: `US$ 2.900 ou R$ ${(2900*5.3)}`,
    custoBruto: 2900*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    descricao: "Caminhadas por Manhattan, jantares sofisticados e noites iluminadas criam a atmosfera ideal para casais apaixonados.",
    keywords: ["Nova York - EUA", "viagem romântica", "Manhattan", "jantares românticos", "passeios urbanos", "casal", "cidade iluminada"],
    img: "https://images.unsplash.com/photo-1764148773958-958354e2dd9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    destino: "Disneylândia - EUA",
    custo: `US$ 3.400 ou R$ ${(3400*5.3)}`,
    custoBruto: 3400*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    descricao: "Momentos mágicos em parques temáticos, shows encantadores e noites iluminadas para casais que amam fantasia.",
    keywords: ["Disneylândia - EUA", "viagem romântica", "Disney", "casal", "parques temáticos", "fantasia", "momentos especiais"],
    img: "https://images.unsplash.com/photo-1605443790760-18c6121939d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzbmV5fGVufDB8fDB8fHww"
  },
  {
    id: 6,
    destino: "Viena - Áustria",
    custo: `€ 2.500 ou R$ ${(2500*6.2)}`,
    custoBruto: 2500*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    descricao: "Arquitetura clássica, música erudita e cafés elegantes criam o cenário perfeito para uma viagem íntima e sofisticada.",
    keywords: ["Viena - Áustria", "viagem romântica", "arquitetura clássica", "cafés elegantes", "concertos", "casal", "clássico europeu"],
    img: "https://images.unsplash.com/photo-1764148776262-c0ccedcf972b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 7,
    destino: "Campos do Jordão - SP",
    custo: "R$ 2.800",
    custoBruto: 2800,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Clima de serra com fondue, lareiras e passeios charmosos que tornam o destino ideal para casais apaixonados.",
    keywords: ["Campos do Jordão - SP", "viagem romântica", "serra", "fondue", "lareira", "passeios a dois", "clima frio"],
    img: "https://images.unsplash.com/photo-1590077066281-edbd16178b7e?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 8,
    destino: "Bonito - MS",
    custo: "R$ 3.200",
    custoBruto: 3200,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Rios cristalinos, natureza exuberante e experiências tranquilas perfeitas para casais que buscam conexão e serenidade.",
    keywords: ["Bonito - MS", "viagem romântica", "natureza", "rios cristalinos", "ecoturismo", "tranquilidade", "casal"],
    img: "https://images.unsplash.com/photo-1764080400008-494ac6caab39?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 9,
    destino: "Foz do Iguaçu - PR",
    custo: "R$ 2.900",
    custoBruto: 2900,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Paisagens grandiosas e passeios envolventes tornam a região perfeita para momentos especiais em casal.",
    keywords: ["Foz do Iguaçu - PR", "viagem romântica", "Cataratas do Iguaçu", "natureza", "aventura a dois", "paisagens", "casal"],
    img: "https://images.unsplash.com/photo-1761237697038-91334ff58bdf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 10,
    destino: "Natal - RN",
    custo: "R$ 2.400",
    custoBruto: 2400,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    descricao: "Praias tranquilas, pôr do sol e clima leve criam o ambiente ideal para uma viagem romântica à beira-mar.",
    keywords: ["Natal - RN", "viagem romântica", "praias", "mar", "pôr do sol", "clima tropical", "casal"],
    img: "https://images.unsplash.com/photo-1763743882687-dde4488507df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 11,
    destino: "Salvador - BA",
    custo: "R$ 2.700",
    custoBruto: 2700,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1664303857523-e983b9a4059b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cenário quente e envolvente, perfeito para casais que querem curtir praias, música e momentos a dois.",
    keywords: ["Salvador - BA", "viagem romântica", "praias", "casal", "Bahia", "gastronomia", "clima tropical"]
  },
  {
    id: 12,
    destino: "Manaus - AM",
    custo: "R$ 3.100",
    custoBruto: 3100,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1718927111065-4bfab7d50a82?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "A natureza exuberante da Amazônia cria o ambiente ideal para experiências tranquilas e conectadas entre casais.",
    keywords: ["Manaus - AM", "viagem romântica", "Amazônia", "floresta", "experiência a dois", "natureza", "rio Negro"]
  },
  {
    id: 13,
    destino: "Fernando de Noronha - PE",
    custo: "R$ 6.800",
    custoBruto: 6800,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1590014444318-eb014b43fb30?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ilhas deslumbrantes com praias isoladas e atmosfera intimista — um paraíso perfeito para casais.",
    keywords: ["Fernando de Noronha - PE", "viagem romântica", "praias paradisíacas", "casal", "natureza", "Pernambuco", "mergulho"]
  },
  {
    id: 14,
    destino: "Morro de São Paulo - BA",
    custo: "R$ 3.500",
    custoBruto: 3500,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1761929239713-dfd79ecf7974?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Refúgio tranquilo com praias encantadoras e passeios ideais para casais que buscam privacidade.",
    keywords: ["Morro de São Paulo - BA", "viagem romântica", "praias", "casal", "Bahia", "refúgio", "clima relaxante"]
  },
  {
    id: 15,
    destino: "Lisboa - Portugal",
    custo: `€ 1.200 ou R$ ${(1200*6.2)}`,
    custoBruto: 1200*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1613098146472-7fc12447bb84?q=80&w=1250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ruas históricas, mirantes e atmosfera charmosa criam um cenário perfeito para momentos inesquecíveis a dois.",
    keywords: ["Lisboa - Portugal", "viagem romântica", "roteiro a dois", "ruas históricas", "Portugal", "mirantes", "charme europeu"]
  },
  {
    id: 16,
    destino: "Paris - França",
    custo: `€ 1.600 ou R$ ${(1600*6.2)}`,
    custoBruto: 1600*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1764218815226-313dfbddb62f?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "A capital do romance oferece cafés, passeios iluminados e cenários perfeitos para celebrar o amor.",
    keywords: ["Paris - França", "viagem romântica", "casal", "romance", "França", "cafés", "charme europeu"]
  },
  {
    id: 17,
    destino: "Londres - Reino Unido",
    custo: `£ 1.400 ou R$ ${(1400*7)}`,
    custoBruto: 1400*7,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1694475622722-3151ed36c6b3?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "A elegância londrina, parques e museus criam um clima sofisticado para viagens românticas.",
    keywords: ["Londres - Reino Unido", "viagem romântica", "casal", "Londres", "clima sofisticado", "roteiro cultural"]
  },
  {
    id: 18,
    destino: "Tóquio - Japão",
    custo: `¥ 330.000 ou R$ ${(330000*0.03)}`,
    custoBruto: 330000*0.03,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1708934315016-337678a85ae4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Entre luzes vibrantes e bairros charmosos, Tóquio oferece experiências modernas para casais aventureiros.",
    keywords: ["Tóquio - Japão", "viagem romântica", "experiência a dois", "Japão", "luzes da cidade", "modernidade"]
  },
  {
    id: 19,
    destino: "Sydney - Austrália",
    custo: `US$ 3.900 ou R$ ${(3900*5.3)}`,
    custoBruto: 3900*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1575043553312-5b6b956a6d9d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Com praias iluminadas pelo sol e clima descontraído, Sydney é ideal para casais que amam aventura e mar.",
    keywords: ["Sydney - Austrália", "viagem romântica", "praias", "casal", "Austrália", "clima ensolarado"]
  },
  {
    id: 20,
    destino: "Bali - Indonésia",
    custo: `US$ 1.900 ou R$ ${(1900*5.3)}`,
    custoBruto: 1900*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1685284203022-19aee18fffd5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Com templos, natureza tropical e resorts íntimos, Bali é um destino perfeito para romance e relaxamento.",
    keywords: ["Bali - Indonésia", "viagem romântica", "templos", "natureza tropical", "casal", "resorts", "relaxamento"]
  },
  {
    id: 21,
    destino: "Cidade do Cabo - África do Sul",
    custo: `US$ 1.350 ou R$ ${(3900*5.3)}`,
    custoBruto: 1350*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1661936361131-c421746dcd0d?q=80&w=959&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cenários costeiros impressionantes e vinícolas perfeitas para brindar momentos especiais a dois.",
    keywords: ["Cidade do Cabo - África do Sul", "viagem romântica", "vinícolas", "paisagens costeiras", "casal", "África do Sul"]
  },
  {
    id: 22,
    destino: "Reykjavik - Islândia",
    custo: `€ 2.000 ou R$ ${(2000*6.2)}`,
    custoBruto: 2000*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1608932304255-f60b22e63ba3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Auroras boreais e cenários nevados criam um clima íntimo e mágico para casais aventureiros.",
    keywords: ["Reykjavik - Islândia", "viagem romântica", "auroras boreais", "casal", "paisagens geladas", "Islândia"]
  },
  {
    id: 23,
    destino: "Vancouver - Canadá",
    custo: `US$ 2.100 ou R$ ${(2000*5.3)}`,
    custoBruto: 2100*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1763802044092-eb969e66b164?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Montanhas nevadas e uma cidade charmosa oferecem o equilíbrio perfeito entre romance e natureza.",
    keywords: ["Vancouver - Canadá", "viagem romântica", "casal", "montanhas nevadas", "Canadá", "natureza e cidade"]
  },
  {
    id: 24,
    destino: "Roma - Itália",
    custo: `€ 1.500 ou R$ ${(1500*6.2)}`,
    custoBruto: 1500*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1618503551238-7df2c50d2236?q=80&w=723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ruas históricas, fontes e gastronomia criam um dos cenários mais românticos da Europa.",
    keywords: ["Roma - Itália", "viagem romântica", "casal", "história", "gastronomia", "Itália", "arquitetura clássica"]
  },
  {
    id: 25,
    destino: "Praga - República Tcheca",
    custo: `€ 1.100 ou R$ ${(1500*6.2)}`,
    custoBruto: 1100*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1525095240410-9645dea911e4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Arquitetura medieval, pontes iluminadas e cenários de conto de fadas perfeitos para casais.",
    keywords: ["Praga - República Tcheca", "viagem romântica", "casal", "arquitetura medieval", "Praga", "cenário encantador"]
  },
  {
    id: 26,
    destino: "Dubai - Emirados Árabes",
    custo: `US$ 2.400 ou R$ ${(2400*5.3)}`,
    custoBruto: 2400*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1669927131902-a64115445f0f?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Luxo moderno, rooftops e experiências exclusivas criam momentos inesquecíveis a dois.",
    keywords: ["Dubai - Emirados Árabes", "viagem romântica", "luxo", "casal", "experiência exclusiva", "roteiros modernos"]
  },
  {
    id: 27,
    destino: "Belo Horizonte - MG",
    custo: "R$ 2.100",
    custoBruto: 2100,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1687984123130-33f679b0242f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Um destino acolhedor com gastronomia marcante, ideal para casais que apreciam cultura e boa comida.",
    keywords: ["Belo Horizonte - MG", "viagem romântica", "gastronomia", "casal", "Minas Gerais", "cultura"]
  },
  {
    id: 28,
    destino: "Ilhéus - BA",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1764148773565-05e16dda98fe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praias tranquilas e atmosfera literária criam um refúgio perfeito para casais.",
    keywords: ["Ilhéus - BA", "viagem romântica", "praias", "casal", "Bahia", "clima tranquilo"]
  },
  {
    id: 29,
    destino: "Mendoza - Argentina",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1726509880790-b8d81f83fd49?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Vinhedos, montanhas e clima intimista — o destino ideal para casais que amam vinhos.",
    keywords: ["Mendoza - Argentina", "viagem romântica", "vinhedos", "casal", "Andes", "Argentina"]
  },
  {
    id: 30,
    destino: "Berlim - Alemanha",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1680582107403-04dfac02efc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "História, bairros charmosos e cafés criam um ambiente ideal para explorar a dois.",
    keywords: ["Berlim - Alemanha", "viagem romântica", "casal", "história", "Alemanha", "roteiro urbano"]
  },
  {
    id: 31,
    destino: "Nuremberg - Alemanha",
    custo: `€ 1.100 ou R$ ${(1100*6.2)}`,
    custoBruto: 1100*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1244&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ruas medievais, luzes acolhedoras e um clima intimista perfeito para casais que buscam tradição.",
    keywords: ["Nuremberg - Alemanha", "viagem romântica", "casal", "arquitetura medieval", "Alemanha", "clima acolhedor"]
  },
  {
    id: 32,
    destino: "Edimburgo - Escócia",
    custo: `£ 1.100 ou R$ ${(1100*7)}`,
    custoBruto: 1100*7,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1531846802986-4942a5c3dd08?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cenários históricos, charme celta e ruas iluminadas criam um ambiente perfeito para momentos a dois.",
    keywords: ["Edimburgo - Escócia", "viagem romântica", "casal", "história", "charme celta", "Escócia"]
  },
  {
    id: 33,
    destino: "Sevilha - Espanha",
    custo: `€ 900 ou R$ ${(900*6.2)}`,
    custoBruto: 900*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1676289157074-1afc4b1dfdea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Clima agradável, arquitetura andaluza e ruas vibrantes criam uma atmosfera romântica e acolhedora.",
    keywords: ["Sevilha - Espanha", "viagem romântica", "casal", "Andaluzia", "arquitetura", "Espanha"]
  },
  {
    id: 34,
    destino: "Santorini - Grécia",
    custo: `€ 1.700 ou R$ ${(1700*6.2)}`,
    custoBruto: 1700*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "",
    descricao: "Casas brancas, mar azul e pores do sol cinematográficos criam um dos destinos mais românticos do mundo.",
    keywords: ["Santorini - Grécia", "viagem romântica", "casal", "pôr do sol", "ilhas gregas", "Grécia"]
  },
  {
    id: 35,
    destino: "Göteborg - Suécia",
    custo: `€ 1.050 ou R$ ${(1050*6.2)}`,
    custoBruto: 1050*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1723928549467-e2ce8a580ee4?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Mercados charmosos, clima nórdico e cenários aconchegantes perfeitos para um passeio romântico.",
    keywords: ["Göteborg - Suécia", "viagem romântica", "casal", "clima nórdico", "Suécia", "mercados charmosos"]
  },
  {
    id: 36,
    destino: "Zermatt - Suíça",
    custo: `CHF 1.800 ou R$ ${(1800*5.8)}`,
    custoBruto: 1800*5.8,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1661290308343-7ba6d3da1466?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Neve, chalés alpinos e paisagens cinematográficas criam um destino perfeito para casais.",
    keywords: ["Zermatt - Suíça", "viagem romântica", "casal", "neve", "chalés alpinos", "Suíça"]
  },
  {
    id: 37,
    destino: "Recife - PE",
    custo: "R$ 2.200",
    custoBruto: 2200,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1568998004334-4e7291e1a04b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cultura vibrante, praias urbanas e gastronomia local criam um clima agradável para casais explorarem juntos.",
    keywords: ["Recife - PE", "viagem romântica", "casal", "praias", "Pernambuco", "cultura"]
  },
  {
    id: 38,
    destino: "Florianópolis - SC",
    custo: "R$ 2.400",
    custoBruto: 2400,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1679682070664-1094166817be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praias variadas, trilhas e clima descontraído formam um destino perfeito para casais em busca de leveza.",
    keywords: ["Florianópolis - SC", "viagem romântica", "casal", "praias", "Santa Catarina", "ilha"]
  },
  {
    id: 39,
    destino: "Ouro Preto - MG",
    custo: "R$ 1.800",
    custoBruto: 1800,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1681830262254-7275853011c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ruas históricas e arquitetura colonial criam um cenário intimista ideal para casais.",
    keywords: ["Ouro Preto - MG", "viagem romântica", "casal", "arquitetura colonial", "Minas Gerais", "história"]
  },
  {
    id: 40,
    destino: "Porto Seguro - BA",
    custo: "R$ 2.300",
    custoBruto: 2300,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praias, boa música e clima animado formam um destino perfeito para casais que buscam diversão.",
    keywords: ["Porto Seguro - BA", "viagem romântica", "casal", "praias", "Bahia", "clima animado"]
  },
  {
      id: 41,
      destino: "Chapada Diamantina - BA",
      custo: "R$ 3.000",
      custoBruto: 3000,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "",
      descricao: "Trilhas, mirantes e cachoeiras perfeitas para casais que buscam romantismo em meio à natureza.",
      keywords: ["Chapada Diamantina - BA", "viagem romântica", "Chapada Diamantina", "Bahia", "natureza", "cachoeiras", "trilhas"],
  },
  {
      id: 42,
      destino: "Buenos Aires - Argentina",
      custo: `US$ 950 ou R$ ${(950*5.3)}`,
      custoBruto: 950*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://plus.unsplash.com/premium_photo-1719843013775-1a101dd75b37?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Tango, cafés charmosos e noites iluminadas — cenário ideal para uma viagem romântica.",
      keywords: ["Buenos Aires - Argentina", "viagem romântica", "Buenos Aires", "Argentina", "tango", "casais"],
  },
  {
      id: 43,
      destino: "Amsterdam - Holanda",
      custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
      custoBruto: 1300*6.2,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Canais encantadores, passeios de bicicleta e arquitetura elegante — atmosfera perfeita para casais.",
      keywords: ["Amsterdam - Holanda", "viagem romântica", "Amsterdam", "Holanda", "canais", "casais"],
  },
  {
      id: 44,
      destino: "Barcelona - Espanha",
      custo: `€ 1.150 ou R$ ${(1150*6.2)}`,
      custoBruto: 1150*6.2,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Arquitetura única, praias urbanas e atmosfera vibrante — destino romântico e cheio de vida.",
      keywords: ["Barcelona - Espanha", "viagem romântica", "Barcelona", "Espanha", "Gaudí", "casais"],
  },
  {
      id: 45,
      destino: "Hong Kong - China",
      custo: `US$ 1.700 ou R$ ${(1700*5.3)}`,
      custoBruto: 1700*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1555397430-57791c75748a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Skyline iluminado, jantares panorâmicos e passeios urbanos — romance em clima moderno e cosmopolita.",
      keywords: ["Hong Kong - China", "viagem romântica", "Hong Kong", "China", "panorama", "casal"],
  },
  {
      id: 46,
      destino: "Montreal - Canadá",
      custo: `US$ 1.600 ou R$ ${(1600*5.3)}`,
      custoBruto: 1600*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1567528316155-303145e85321?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Ruas charmosas, clima frio aconchegante e cafés acolhedores — perfeito para casais.",
      keywords: ["Montreal - Canadá", "viagem romântica", "Montreal", "Canadá", "clima frio", "casais"],
  },
  {
      id: 47,
      destino: "João Pessoa - PB",
      custo: "R$ 1.900",
      custoBruto: 1900,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1632798121054-c6b73cc9e8b0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Praias tranquilas, águas mornas e pôr do sol inesquecível — destino ideal para casais.",
      keywords: ["João Pessoa - PB", "viagem romântica", "João Pessoa", "Paraíba", "praias", "casais"],
  },
  {
      id: 48,
      destino: "Arraial do Cabo - RJ",
      custo: "R$ 2.000",
      custoBruto: 2000,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Águas cristalinas e passeios de barco que criam momentos perfeitos para casais.",
      keywords: ["Arraial do Cabo - RJ", "viagem romântica", "Arraial do Cabo", "Rio de Janeiro", "praias", "casais"],
  },
  {
      id: 49,
      destino: "Búzios - RJ",
      custo: "R$ 2.350",
      custoBruto: 2350,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=768&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Praias elegantes, clima sofisticado e restaurantes à beira-mar — ideal para casais apaixonados.",
      keywords: ["Búzios - RJ", "viagem romântica", "Búzios", "Rio de Janeiro", "praias", "casal"],
  },
  {
      id: 50,
      destino: "Paraty - RJ",
      custo: "R$ 1.700",
      custoBruto: 1700,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "",
      descricao: "Centro histórico charmoso, natureza preservada e clima acolhedor — destino romântico clássico.",
      keywords: ["Paraty - RJ", "viagem romântica", "Paraty", "Rio de Janeiro", "histórico", "casais"],
  },
  {
      id: 51,
      destino: "Porto de Galinhas - PE",
      custo: "R$ 2.350",
      custoBruto: 2350,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://plus.unsplash.com/premium_photo-1661290308343-7ba6d3da1466?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Piscinas naturais e praias paradisíacas — destino perfeito para casais apaixonados.",
      keywords: ["Porto de Galinhas - PE", "viagem romântica", "Porto de Galinhas", "Pernambuco", "piscinas naturais", "casais"],
  },
  {
      id: 52,
      destino: "Seul - Coreia do Sul",
      custo: `US$ 1.700 ou R$ ${(1700*5.3)}`,
      custoBruto: 1700*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1760669348865-75d0e9733604?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Luzes, cafés estilosos e atmosfera moderna — cidade ideal para casais que amam cultura urbana.",
      keywords: ["Seul - Coreia do Sul", "viagem romântica", "Seul", "Coreia do Sul", "casais", "cidade moderna"],
  },
  {
      id: 53,
      destino: "Auckland - Nova Zelândia",
      custo: `US$ 2.400 ou R$ ${(2400*5.3)}`,
      custoBruto: 2400*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1612278675615-7b093b07772d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Paisagens únicas, praias tranquilas e clima leve — viagem perfeita para romance ao ar livre.",
      keywords: ["Auckland - Nova Zelândia", "viagem romântica", "Auckland", "Nova Zelândia", "paisagens naturais", "casais"],
  },
  {
      id: 54,
      destino: "Marrakech - Marrocos",
      custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
      custoBruto: 1200*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://plus.unsplash.com/premium_photo-1699566448055-671c8dbcc7ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Medinas, cores vivas e palácios exuberantes — romance com toque exótico e cultural.",
      keywords: ["Marrakech - Marrocos", "viagem romântica", "Marrakech", "Marrocos", "medina", "casais"],
  },
  {
      id: 55,
      destino: "Kuala Lumpur - Malásia",
      custo: `US$ 1.350 ou R$ ${(1350*5.3)}`,
      custoBruto: 1350*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://images.unsplash.com/photo-1544456808-7530b2d112df?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Arranha-céus icônicos, cultura diversa e gastronomia marcante — ideal para casais exploradores.",
      keywords: ["Kuala Lumpur - Malásia", "viagem romântica", "Kuala Lumpur", "Malásia", "casais", "culinária"],
  },
  {
      id: 56,
      destino: "Santiago - Chile",
      custo: `US$ 950 ou R$ ${(950*5.3)}`,
      custoBruto: 950*5.3,
      tipo: "Viagem Romântica",
      categoria: "internacional",
      img: "https://plus.unsplash.com/premium_photo-1661317206280-04986748a167?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Montanhas, vinícolas e clima agradável — cenário romântico para casais que amam natureza e vinhos.",
      keywords: ["Santiago - Chile", "viagem romântica", "Santiago", "Chile", "vinhos", "casais"],
  },
  {
      id: 57,
      destino: "Maceió - AL",
      custo: "R$ 1.950",
      custoBruto: 1950,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1764293926603-2742b7180c3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Praias de águas claras e mar calmo — destino ideal para casais que buscam descanso e romance.",
      keywords: ["Maceió - AL", "viagem romântica", "Maceió", "Alagoas", "praias", "casais"],
  },
  {
      id: 58,
      destino: "São Luís - MA",
      custo: "R$ 1.700",
      custoBruto: 1700,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1701006643345-e8971bbccd98?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "História, arquitetura colonial e clima acolhedor — uma viagem romântica com muita cultura.",
      keywords: ["São Luís - MA", "viagem romântica", "São Luís", "Maranhão", "histórico", "casais"],
  },
  {
      id: 59,
      destino: "Belém - PA",
      custo: "R$ 1.800",
      custoBruto: 1800,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1544456808-7530b2d112df?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Sabores amazônicos, passeios culturais e natureza próxima — ideal para casais curiosos e exploradores.",
      keywords: ["Belém - PA", "viagem romântica", "Belém", "Pará", "culinária", "casais"],
  },
  {
      id: 60,
      destino: "Vitória - ES",
      custo: "R$ 1.650",
      custoBruto: 1650,
      tipo: "Viagem Romântica",
      categoria: "nacional",
      img: "https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Praias tranquilas e gastronomia litorânea — destino romântico leve e acolhedor.",
      keywords: ["Vitória - ES", "viagem romântica", "Vitória", "Espírito Santo", "praias", "casais"],
  },
  {
    id: 61,
    destino: "Campo Grande - MS",
    custo: "R$ 1.500",
    custoBruto: 1500,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Porta de entrada para o Pantanal, ideal para casais que buscam contato com a natureza, momentos tranquilos e passeios românticos pela fauna e flora.",
    keywords: ["Campo Grande - MS", "viagem romântica", "Pantanal", "natureza", "casal", "ecoturismo"],
  },
  {
    id: 62,
    destino: "Dublin - Irlanda",
    custo: `€ 1.300 ou R$ ${(1300*6.2)}`,
    custoBruto: 1300*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Pubs acolhedores, música ao vivo e ruas charmosas criam o clima perfeito para uma viagem romântica pelas tradições irlandesas.",
    keywords: ["Dublin - Irlanda", "viagem romântica", "pubs", "cultura", "música ao vivo", "casal"],
  },
  {
    id: 63,
    destino: "Oslo - Noruega",
    custo: `€ 1.500 ou R$ ${(1500*6.2)}`,
    custoBruto: 1500*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Paisagens nórdicas, clima intimista e cenários de inverno tornam Oslo um destino romântico e sofisticado para casais.",
    keywords: ["Oslo - Noruega", "viagem romântica", "inverno", "paisagens nórdicas", "casal", "romance"],
  },
  {
    id: 64,
    destino: "Helsinque - Finlândia",
    custo: `€ 1.200 ou R$ ${(1200*6.2)}`,
    custoBruto: 1200*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Arquitetura moderna e cenários gelados criam um ambiente elegante e romântico para casais que desejam experiências únicas no frio.",
    keywords: ["Helsinque - Finlândia", "viagem romântica", "neve", "arquitetura moderna", "casal", "frio"],
  },
  {
    id: 65,
    destino: "Bangkok - Tailândia",
    custo: `US$ 1.300 ou R$ ${(1300*5.3)}`,
    custoBruto: 1300*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Templos iluminados, mercados vibrantes e sabores marcantes criam um cenário exótico para casais que buscam romance com cultura e aventura.",
    keywords: ["Bangkok - Tailândia", "viagem romântica", "templos", "mercados", "gastronomia", "casal"],
  },
  {
    id: 66,
    destino: "Istambul - Turquia",
    custo: `US$ 1.150 ou R$ ${(1150*5.3)}`,
    custoBruto: 1150*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1514846528774-8de9d4a07023?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Uma mistura encantadora entre Europa e Ásia, repleta de história, bazares e paisagens perfeitas para momentos românticos a dois.",
    keywords: ["Istambul - Turquia", "viagem romântica", "bazar", "história", "cultura", "casal"],
  },
  {
    id: 67,
    destino: "Jericoacoara - CE",
    custo: "R$ 2.100",
    custoBruto: 2100,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1563455227142-d0f82238d6f8?q=80&w=1866&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Dunas, lagoas e um pôr do sol apaixonante tornam Jericoacoara um destino perfeito para casais que desejam romance à beira-mar.",
    keywords: ["Jericoacoara - CE", "viagem romântica", "dunas", "lagoas", "pôr do sol", "casal"],
  },
  {
    id: 68,
    destino: "Maragogi - AL",
    custo: "R$ 2.200",
    custoBruto: 2200,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1621693247912-767f47a3c382?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Piscinas naturais e praias paradisíacas criam um clima romântico ideal para casais que buscam descanso e momentos especiais juntos.",
    keywords: ["Maragogi - AL", "viagem romântica", "piscinas naturais", "praias", "casal", "mar"],
  },
  {
    id: 69,
    destino: "Pipa - RN",
    custo: "R$ 2.000",
    custoBruto: 2000,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1519907246514-312efc44ef9e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Falésias, praias charmosas e clima descontraído fazem de Pipa um destino perfeito para casais que desejam romance com boas opções de lazer.",
    keywords: ["Pipa - RN", "viagem romântica", "falésias", "praias", "casal", "noite"],
  },
  {
    id: 70,
    destino: "Lençóis Maranhenses - MA",
    custo: "R$ 3.100",
    custoBruto: 3100,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1686824684855-d389a22f762a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cenários de dunas e lagoas cristalinas criam uma atmosfera mágica para casais que buscam uma viagem romântica em meio à natureza.",
    keywords: ["Lençóis Maranhenses - MA", "viagem romântica", "dunas", "lagoas", "casal", "natureza"],
  },
  {
    id: 71,
    destino: "Canela - RS",
    custo: "R$ 2.700",
    custoBruto: 2700,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1583855282680-6dbdc69b0932?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Clima serrano, paisagens naturais e atrações encantadoras criam o cenário perfeito para uma viagem romântica pertinho de Gramado.",
    keywords: ["Canela - RS", "viagem romântica", "serra", "natureza", "casal", "romance"],
  },
  {
    id: 72,
    destino: "Veneza - Itália",
    custo: `€ 1.400 ou R$ ${(1400*6.2)}`,
    custoBruto: 1400*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1527142879-95b61a0b8226?q=80&w=1148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Canais, gôndolas e arquitetura histórica formam um dos cenários mais românticos do mundo para casais.",
    keywords: ["Veneza - Itália", "viagem romântica", "canais", "gôndolas", "casal", "arquitetura"],
  },
  {
    id: 73,
    destino: "Los Angeles - EUA",
    custo: `US$ 1.450 ou R$ ${(1450*5.3)}`,
    custoBruto: 1450*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praias, clima ameno e cenários clássicos do cinema criam um ambiente perfeito para casais que buscam romance e diversão.",
    keywords: ["Los Angeles - EUA", "viagem romântica", "praias", "entretenimento", "casal", "cultura pop"],
  },
  {
    id: 74,
    destino: "Nova Délhi - Índia",
    custo: `US$ 1.100 ou R$ ${(1100*5.3)}`,
    custoBruto: 1100*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1528759335187-3b683174c86a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Monumentos icônicos, mercados vibrantes e muita história tornam a viagem perfeita para casais que buscam cultura e experiências marcantes.",
    keywords: ["Nova Délhi - Índia", "viagem romântica", "história", "mercados", "casal", "cultura"],
  },
  {
    id: 75,
    destino: "Singapura - Singapura",
    custo: `US$ 1.300 ou R$ ${(1300*5.3)}`,
    custoBruto: 1300*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://plus.unsplash.com/premium_photo-1730035378488-4ce8edd1761b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cidade moderna, paisagens iluminadas e gastronomia sofisticada criam uma viagem romântica cheia de conforto e elegância.",
    keywords: ["Singapura - Singapura", "viagem romântica", "cidade-jardim", "gastronomia", "casal", "luxo"],
  },
  {
    id: 76,
    destino: "Madri - Espanha",
    custo: `€ 1.000 ou R$ ${(1000*6.2)}`,
    custoBruto: 1000*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praças iluminadas, mercados charmosos e tradição espanhola criam um ambiente acolhedor e romântico para casais.",
    keywords: ["Madri - Espanha", "viagem romântica", "praças", "mercados", "casal", "cultura"],
  },
  {
    id: 77,
    destino: "Ilhabela - SP",
    custo: "R$ 1.950",
    custoBruto: 1950,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1495822892661-2ead864e1c7b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praias preservadas, trilhas e muita natureza criam o clima ideal para uma viagem romântica à beira-mar.",
    keywords: ["Ilhabela - SP", "viagem romântica", "praias", "trilhas", "casal", "natureza"],
  },
  {
    id: 78,
    destino: "Tiradentes - MG",
    custo: "R$ 1.600",
    custoBruto: 1600,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=1110&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ruas históricas, charme colonial e gastronomia sofisticada tornam Tiradentes um destino perfeito para casais.",
    keywords: ["Tiradentes - MG", "viagem romântica", "histórico", "gastronomia", "casal", "charme"],
  },
  {
    id: 79,
    destino: "Jalapão - TO",
    custo: "R$ 3.200",
    custoBruto: 3200,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Fervedouros, dunas e paisagens únicas criam uma experiência romântica para casais que amam aventura.",
    keywords: ["Jalapão - TO", "viagem romântica", "fervedouros", "dunas", "casal", "natureza"],
  },
  {
    id: 80,
    destino: "São Paulo - SP",
    custo: "R$ 1.300",
    custoBruto: 1300,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://plus.unsplash.com/premium_photo-1683141079772-acf46d5e2ebb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Cultura, gastronomia e vida urbana oferecem inúmeras possibilidades de programas românticos a dois.",
    keywords: ["São Paulo - SP", "viagem romântica", "gastronomia", "cultura", "casal", "cidade"],
  },
  {
    id: 81,
    destino: "Guarapari - ES",
    custo: "R$ 1.850",
    custoBruto: 1850,
    tipo: "Viagem Romântica",
    categoria: "nacional",
    img: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Destino litorâneo perfeito para casais que buscam praias tranquilas, caminhadas ao pôr do sol e momentos relaxantes à beira-mar.",
    keywords: ["Guarapari - ES", "viagem romântica", "praia para casais", "Espírito Santo", "pôr do sol", "refúgio a dois"],
  },
  {
    id: 82,
    destino: "Bruxelas - Bélgica",
    custo: `€ 1.150 ou R$ ${(1150*6.2)}`,
    custoBruto: 1150*6.2,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Ruas charmosas, chocolaterias e arquitetura europeia que criam o cenário ideal para passeios a dois cheios de elegância.",
    keywords: ["Bruxelas - Bélgica", "viagem romântica", "Europa a dois", "Bélgica", "chocolate", "passeios charmosos"],
  },
  {
    id: 83,
    destino: "Lima - Peru",
    custo: `US$ 950 ou R$ ${(950*5.3)}`,
    custoBruto: 950*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1574260031597-bcd9eb192b4f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Culinária premiada, bairros românticos e vistas costeiras fazem de Lima um destino perfeito para casais apaixonados.",
    keywords: ["Lima - Peru", "viagem romântica", "gastronomia a dois", "Peru", "costa peruana", "cultura"],
  },
  {
    id: 84,
    destino: "Quito - Equador",
    custo: `US$ 900 ou R$ ${(900*5.3)}`,
    custoBruto: 900*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Arquitetura colonial, ruas históricas e vistas andinas criam um clima aconchegante e perfeito para uma viagem romântica.",
    keywords: ["Quito - Equador", "viagem romântica", "centro histórico", "Andes", "arquitetura colonial", "passeio a dois"],
  },
  {
    id: 85,
    destino: "Cairo - Egito",
    custo: `US$ 1.200 ou R$ ${(1200*5.3)}`,
    custoBruto: 1200*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Um ambiente exótico com pirâmides, mercados tradicionais e passeios às margens do Nilo — ideal para casais aventureiros.",
    keywords: ["Cairo - Egito", "viagem romântica", "pirâmides", "Egito", "destino exótico", "cultura"],
  },
  {
    id: 86,
    destino: "Zanzibar - Tanzânia",
    custo: `US$ 1.600 ou R$ ${(1600*5.3)}`,
    custoBruto: 1600*5.3,
    tipo: "Viagem Romântica",
    categoria: "internacional",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Praias paradisíacas, águas turquesa e clima tropical perfeito para dias relaxantes e experiências românticas à beira-mar.",
    keywords: ["Zanzibar - Tanzânia", "viagem romântica", "praias paradisíacas", "Tanzânia", "refúgio tropical", "mar azul"],
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
  color: "#EF4444",
  height: 2.5,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    border: '2px solid #EF4444',
    boxShadow: '0 0 6px rgba(0,0,0,0.3)'
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#ddd'
  }
});


export default function ViagensRomanticas() {
  const [filtro, setFiltro] = useState<"nacional" | "internacional">("nacional");
  const [pesquisaAtiva, setPesquisaAtiva] = useState<boolean>(false);
  const [pesquisaAtual, setPesquisaAtual] = useState<string>('');
  const [largura, setLargura] = useState(window.innerWidth);
  const [value, setValue] = useState([1000, 10000]);
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
  <div id="body" className="viagens-romanticas-screen">
    {largura >= 1024 ? (
      <MenuLateral expandirMargem={expandirMargem}/>
    ) : 
    (
      <MenuVertical />
    )
    }
    <header id="header" className="viagens-romanticas-screen">
      {/* Filtros */}
      {largura >= 1024 && !menuExpandidoH1 && (
        <h1 className="viagens-romanticas-screen">ViaJour</h1>
      )}
      <h1 className={`titulo viagens-romanticas-screen ${largura < 1024 && scroll_do_user ? 'sumir' : 'aparecer'}`}>
        💘 Viagens Românticas
        <p className="subtitulo viagens-romanticas-screen">
          Explore destinos perfeitos para uma viagem romântica. Previsão de custo para 7 dias.
        </p>
      </h1>
      <div className="filtros viagens-romanticas-screen">
        <div onMouseLeave={() => {
          if (largura >= 1024) {
            if (pesquisaAtiva) {ativarPesquisa()}
          } else return;
          }}
          style={{backgroundColor: pesquisaAtiva ? '#EF4444' : ''}} className="filtro-busca viagens-romanticas-screen">
          <input onChange={(event) => {
            scrollToHeader();
            const textoDigitado = event.target.value;
            const textoFormatado = formatarString(textoDigitado);
            setPesquisaAtual(textoFormatado)}} placeholder="Feliz Natal!" type="text" className="viagens-romanticas-screen" name="searchViagem" id="searchViagem"
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
              className={`btn-filtro ${filtro === "internacional" ? "btn-ativo" : ""} viagens-romanticas-screen`}
            >
              Viagens internacionais
            </button>
            <hr id="hr-btn-viagem" className="hr-vertical viagens-romanticas-screen" />
            <button
              id="btn-viagem-nacional"
              onClick={() => {setFiltro("nacional"); scrollToHeader()}}
              className={`btn-filtro ${filtro === "nacional" ? "btn-ativo" : ""} viagens-romanticas-screen`}
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
            className="icone viagens-romanticas-screen">
            <i className="fa-solid fa-magnifying-glass viagens-romanticas-screen"></i>
            </div>
        </div>

        <div className="filtro-preco viagens-romanticas-screen">
          <div className="custo-estimado viagens-romanticas-screen">
            <h2>Custo estimado</h2>
            <h3>R$ {value[0]} - {value[1]} </h3>
          </div>
          <SliderCustomizado step={100} value={value} onChange={(_, newValue) => {
             if (Array.isArray(newValue)) {
              setValue(newValue);
              scrollToHeader();
             } else return;
             }} 
            valueLabelDisplay="auto" min={0} max={25000} />
        </div>
      </div>
    </header>
    
    <main id="container" className="pagina-natal viagens-romanticas-screen">
      {/* Cards */}
      <div className="lista-viagens viagens-romanticas-screen">
        {itemsToShow.map((v) => (
          <div
            key={v.id}
            className="card-viagem viagens-romanticas-screen"
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.destino}
                className="card-img viagens-romanticas-screen"
              />
            )}
            <div className="card-info viagens-romanticas-screen">
              <div className="viagens-romanticas-screen">
                <h2 className="card-titulo viagens-romanticas-screen">{v.destino}</h2>
                <p className="card-descricao viagens-romanticas-screen">{v.descricao}</p>
                <p className="card-custo viagens-romanticas-screen">
                  Custo estimado (7 dias):{" "}
                  <span className="viagens-romanticas-screen">{v.custo}</span>
                </p>
              </div>
              <span className="tag-natalina viagens-romanticas-screen">
                {v.tipo}
              </span>
            </div>
          </div>
        ))}
        {/* sentinel for infinite scroll */}
        <div ref={sentinelRef} style={{height: 1}} aria-hidden />

        {/* loader / status */}
        {itemsToShow.length < viagensFiltradas.length ? (
          <div className="loader-carregando viagens-romanticas-screen">Carregando mais viagens...</div>
        ) : (
          <div className="loader-fim viagens-romanticas-screen">{itemsToShow.length === 0 ? 'Nenhuma viagem encontrada' : 'Você chegou ao fim'}</div>
        )}
      </div>
    </main>

    
    {largura >= 1024 ? (
      <AnuncioDesktop isTelaDeViagens={true} />
    ) : (
      <AnuncioMobile/>
    )}

  </div>
);

}
