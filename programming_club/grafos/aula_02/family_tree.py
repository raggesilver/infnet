import matplotlib.pyplot as plt
import networkx as nx


def plotar_arvore_genealogica():
    G = nx.DiGraph()

    # Adicionando nós
    G.add_node("Você")
    G.add_node("Mãe")
    G.add_node("Pai")
    G.add_node("Avó Materna")
    G.add_node("Avô Materno")
    G.add_node("Avó Paterna")
    G.add_node("Avô Paterno")
    # Adicionando arestas
    G.add_edge("Avó Materna", "Mãe")
    G.add_edge("Avô Materno", "Mãe")
    G.add_edge("Avó Paterna", "Pai")
    G.add_edge("Avô Paterno", "Pai")
    G.add_edge("Mãe", "Você")
    G.add_edge("Pai", "Você")

    # Plotando
    pos = nx.spring_layout(G)
    nx.draw(
        G,
        pos,
        with_labels=True,
        node_size=3000,
        node_color="skyblue",
        font_size=10,
        font_weight="bold",
    )
    plt.show()


plotar_arvore_genealogica()
