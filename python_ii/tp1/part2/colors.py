from enum import Enum


class TerminalTextStyle(Enum):
    RED = "\033[31m"  # Red text
    BOLD = "\033[1m"  # Bold text
    RESET = "\033[0m"  # Reset to default
    BOLD_RED = "\033[1;31m"  # Bold red text
    GREEN = "\033[32m"  # Green text
    BOLD_GREEN = "\033[1;32m"  # Bold green text
