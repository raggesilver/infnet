#include <iostream>
#include <map>

// https://judge.beecrowd.com/pt/runs/code/39992918
// clang++ -o out 06_counting_in_chinese.cpp -std=c++20 -Wall -Werror -Wextra
// -O2

// This implementation is based on
// https://github.com/IvanIsCoding/CompetitiveProgramming/blob/master/beecrowd/2102.cpp

// Although all my solutions so far have been in C, I decided to use C++ for
// this to avoid having to implement my own map data structure.

int main()
{
    std::map<std::pair<int, int>, int> map;

    int T;
    std::cin >> T;

    for (int i = 0; i < T; i++) {
        if (i > 0) {
            std::cout << std::endl;
            map.clear();
        }

        int m, n;
        std::cin >> m >> n;

        while (n--) {
            int p, v, l, c;
            std::cin >> p >> l >> c >> v;

            map[std::make_pair(l, c)] += v;
        }

        for (auto it = map.begin(); it != map.end(); it++) {
            std::cout << it->first.first << " " << it->first.second << " "
                      << it->second << std::endl;
        }
    }
    return 0;
}
