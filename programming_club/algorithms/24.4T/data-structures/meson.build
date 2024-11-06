project(
  'datastructures',
  'c',
  version: '0.1',
  default_options: ['warning_level=3', 'c_std=gnu23'],
)

sources = files(
  'linked-list.c',
  'linked-list.h',
)

lib_args = []

shlib = shared_library(
  'datastructures',
  sources,
  install: true,
  c_args: lib_args,
)

# if get_option('tests')
test_exe = executable('linkedlist', 'linked-list.test.c', link_with: shlib)
test('linkedlist', test_exe)
# endif

# Make this library usable as a Meson subproject.
datastructures_dep = declare_dependency(include_directories: include_directories('.'), link_with: shlib)

# Make this library usable from the system's
# package manager.
# install_headers('datastructures.h', subdir: 'datastructures')

pkg_mod = import('pkgconfig')
pkg_mod.generate(
  name: 'datastructures',
  filebase: 'datastructures',
  description: 'Meson sample project.',
  subdirs: 'datastructures',
  libraries: shlib,
  version: '0.1',
)
