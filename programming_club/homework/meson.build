project('homework', 'c',
  version : '0.1',
  default_options : ['warning_level=2', 'c_std=c99', 'optimization=2'])

targets = files(
    'week_01/01_hello_world.c',
    'week_01/02_extremely_basic.c',
    'week_01/03_summing_consecutive_integers.c',
    'week_01/04_system_of_a_download.c',
    'week_01/05_lost_piece.c',
    'week_01/06_lost_piece_hard.c',
    'week_01/07_i_was_told_there_would_be_no_math.c',
    'week_01/generate_lost_piece_input.c',
    'week_02/01_good_division.c',
    'week_02/02_ufpr_gaming.c',
    'week_02/03_whose_turn.c',
    'week_02/04_radars.c',
    'week_02/05_airport.c',
    'week_02/06_base_32.c',
    'week_03/01_fill_array.c',
    'week_03/02_bad_luck.c',
    'week_03/03_naming_roads.c',
    'week_03/04_the_force_awakens.c',
    'week_03/05_christmas_gift.c',
    )

fs = import('fs')
foreach target : targets
  executable(fs.replace_suffix(fs.name(target), ''),
             target,
             install : true)
endforeach
