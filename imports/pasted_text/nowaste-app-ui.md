Design a complete, high-fidelity desktop web app UI called "NoWaste" — a single B2B SaaS platform 
for industrial symbiosis and circular economy. It is ONE unified app where the SAME company acts as 
BOTH a waste generator (sells/offers industrial waste) AND a waste receiver (buys waste to reuse as 
raw material, production input, or alternative fuel). This dual role is the core concept: do NOT design 
two separate apps — design one app with a mode switch in the top navigation between "Vender Resíduos" 
and "Comprar Insumos", so the user fluidly moves between offering their waste and sourcing inputs from 
others. Design for desktop web at 1440px width. All UI text in BRAZILIAN PORTUGUESE.

VISUAL STYLE: Clean corporate B2B SaaS. Minimal, structured, trustworthy, lots of whitespace, no flashy 
gradients, sober and credible (companies share sensitive material/chemical data, so it must feel secure). 
Data-dense but breathable.

BRAND:
- Primary blue #0056AC — headings, primary buttons, active navigation
- Accent blue #0197F4 — links, secondary actions, highlights
- Sustainability green #31B657 — used ONLY for success states, savings, positive metrics, and 
  "reaproveitável" eco signals
- White #FFFFFF background; light grey #F5F7FA for cards/surfaces; #E5E9F0 for borders
- Rounded corners 8px, soft subtle shadows, clean sans-serif font (Inter)

GLOBAL NAVIGATION (consistent on every logged-in screen):
A persistent top navbar containing: the NoWaste logo (left); a prominent toggle/segmented control in 
the center labeled "Vender Resíduos | Comprar Insumos" that switches the whole app context between the 
two roles; a search bar; a notifications bell; and the company avatar/profile menu (right). The active 
mode is highlighted in primary blue. A left sidebar holds the main menu: Dashboard, Meus Resíduos, 
Marketplace, Negociações, Relatórios, Planos.

DESIGN ALL OF THE FOLLOWING SCREENS, each as a separate frame, visually consistent with one another:

1. LOGIN / SaaS ENTRY
Split-screen layout. Left: a clean, sober login card with email corporativo, senha, "Entrar" button 
(primary blue), "Esqueci a senha" link, and "Criar conta da empresa" link. Right: a brand panel with 
the NoWaste logo, the tagline "Transforme resíduo em oportunidade", and three short SaaS value bullets 
(economia circular, redução de custos operacionais, conformidade ambiental). No navbar on this screen.

2. DASHBOARD (home after login)
Show the global top navbar and sidebar. A top row of KPI metric cards: "Resíduos cadastrados", 
"Matches ativos", "Negociações em andamento", and "Economia gerada (R$)" — the savings card accented 
in green #31B657. Two prominent quick-action buttons: "Cadastrar novo resíduo" (primary blue) and 
"Explorar marketplace" (secondary). A "Matches recentes" list showing compatible companies nearby with 
a compatibilidade percentage and distância em km each. A compact map-preview widget showing 
geolocalização de empresas compatíveis. Clean dashboard grid with generous spacing.

3. CADASTRAR RESÍDUO  (the "Vender Resíduos" core flow — generator side)
A multi-step form with a 3-step progress stepper at the top:
  Step 1 — Identificação: nome do resíduo; categoria (dropdown: sólido / efluente químico / mistura / 
    resíduo médico / construção civil); quantidade (kg); frequência de geração (mensal / anual).
  Step 2 — Caracterização técnica: composição química; classe de periculosidade; campo de upload de 
    laudo/ficha técnica.
  Step 3 — Disponibilidade & logística: localização; prazo de disponibilidade; opções de transporte; 
    preço ou opção "a negociar".
Include a small info box explaining "anonimização parcial e confidencialidade garantida por contrato". 
Footer buttons: "Voltar", "Próximo", and on the final step "Publicar resíduo".

4. MARKETPLACE / VITRINE  (the "Comprar Insumos" core flow — receiver side; this is the central screen)
A left filter sidebar: categoria, classe química, raio/distância, quantidade, periculosidade, faixa de 
preço. Top bar: search field, sort dropdown, and a "Lista | Mapa" view toggle. The main area is a grid 
of resíduo cards. Each card shows: an icon/photo of the material; nome do resíduo; categoria; quantidade 
disponível (kg); distância (km); a green "Reaproveitável" badge; a compatibilidade percentage badge; 
preço or "Negociar"; and a "Ver detalhes" button. Scannable, enterprise marketplace layout.

5. DETALHE DO RESÍDUO / MATCH
A full listing detail page. Left/main column: ficha técnica completa (composição química, classe de 
periculosidade, quantidade, frequência), a photo gallery, the empresa geradora shown partially 
anonymized, and an approximate location on a small map. A "Compatibilidade técnica" score with a short 
explanation. PROMINENTLY FEATURE a cost-comparison card titled "Cenário SEM NoWaste × COM NoWaste" 
showing tratamento/incineração dropping from R$28.000 to R$0 (waste reused as insumo), logística kept, 
and the "Economia gerada" total highlighted in green #31B657. Right column / sticky panel: primary CTA 
"Iniciar negociação" and secondary "Solicitar contato".

6. NEGOCIAÇÃO (where the two sides close the loop)
A negotiation thread / chat interface between gerador and receptor on the left. A right sidebar with a 
deal summary: material, quantidade, preço proposto, status, and logística. Below the chat or in the 
sidebar, a section "Contrato de confidencialidade e responsabilidade técnica" with a document placeholder 
and an "Assinar / Aceitar termos" button. Across the top, a horizontal status tracker with pills: 
"Negociação → Contrato → Logística → Reaproveitamento", current step highlighted.

7. PLANOS & ASSINATURA (SaaS pricing)
Three monthly pricing tiers as clean B2B cards, the middle one highlighted with a "Mais popular" ribbon. 
Each tier lists features: vitrine de compra e venda, matches ilimitados, indicadores ambientais, 
eficiência circular, consultoria técnica. Include a note explaining "comissão de intermediação sobre 
negociações realizadas". Each card has an "Assinar plano" CTA.

8. MINI DESIGN SYSTEM (one dedicated component frame)
Show reusable components: buttons (primary blue, secondary outline, green success); input field; the 
resíduo marketplace card; the KPI metric card; the compatibilidade % badge; status pills (Disponível / 
Em negociação / Concluído); the top navbar WITH the Vender/Comprar mode switch; and the 
SEM×COM cost-comparison card.

CONSISTENCY RULES (apply across all screens):
- One coherent design system; identical navbar, sidebar, typography, spacing, and components everywhere.
- Green #31B657 strictly reserved for sustainability, savings, and positive signals — never for 
  generic UI or navigation.
- Blue #0056AC / #0197F4 for navigation, primary actions, and links.
- Keep it clean corporate B2B from start to finish.