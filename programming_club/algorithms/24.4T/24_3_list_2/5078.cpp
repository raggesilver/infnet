#include <algorithm>
#include <iostream>
#include <vector>

using std::cin;
using std::cout;

int main(void) {

  int n, q;

  cin >> n;

  auto x = std::vector<int>(n);

  for (int i = 0; i < n; i++) {
    cin >> x[i];
  }

  std::sort(x.begin(), x.end());

  cin >> q;

  for (int i = 0; i < q; i++) {
    int m;
    cin >> m;

    // find the last element that is less than or equal to m
    auto ub = std::upper_bound(x.begin(), x.end(), m);

    if (ub == x.begin() && *ub > m) {
      cout << 0 << '\n';
    } else if (ub == x.end()) {
      cout << n << '\n';
    } else {
      cout << ub - x.begin() << '\n';
    }
  }

  return 0;
}
