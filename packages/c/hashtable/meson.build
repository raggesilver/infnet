project('all', 'c',
  version : '0.1',
  default_options : ['warning_level=3', 'c_std=gnu2x'])

lib = library('raggetable', 'hashtable.c', install: true)

install_headers('hashtable.h', subdir: 'raggetable')

pkg = import('pkgconfig')
pkg.generate(lib, version: meson.project_version(), subdirs: 'raggetable')

srcs = files(
    'main.c',
    )

# unity_subproject = subproject('unity')
# unity_dependency = unity_subproject.get_variable('unity_dep')
#
# hashtable_test = executable('hashtable_test', files('hashtable.c', 'hashtable.test.c'), dependencies: [ unity_dependency ])
# test('hashtable', hashtable_test)

executable('myproject',
           srcs,
           link_with : lib,
           install : false)
