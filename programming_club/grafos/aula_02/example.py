from matplotlib import pyplot as plt
import networkx as nx

G = nx.Graph()

G.add_nodes_from([1, 2, 3, 4, 5])

G.add_edges_from([(1, 2), (1, 3), (1, 4), (1, 5), (2, 3), (3, 4), (4, 5), (5, 2)])

nx.draw(G, with_labels=True, font_weight='bold', node_size=800)
plt.title("Grafo")
plt.show()

