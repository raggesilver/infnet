project('algorithms', 'c',
  version : '0.1',
  default_options : ['warning_level=2', 'c_std=gnu99', 'optimization=2'])

targets = files(
    'week_01/01_1794.c',
    'week_01/02_3467.c',
    )

tests = files(
  # 'week_03/05_christmas_gift.c',
  )

fs = import('fs')

foreach target : targets
  target_name = fs.replace_suffix(fs.name(target), '')
  exe = executable(target_name,
                   target,
                   install : true)
  if tests.contains(target)
    input = target.full_path().replace('.c', '_input.txt')
    test('@0@_test'.format(fs.name(target_name)),
         exe,
         args: [input])
  endif
endforeach

