# git module 常用命令

```sh
git submodule init
git submodule update

git submodule add -f -b  metadao_main git@gitlab.ambt.art:appdev/aplink/aplink-im-flutter.git submodules/aplink-im-flutter

git submodule add -f -b  main git@gitlab.ambt.art:appdev/aplink/aplink-app-resources.git submodules/aplink-app-resources
git submodule add -f -b metadao_merge git@gitlab.ambt.art:appdev/aplink/aplink-submodules.git submodules/aplink-submodules


git submodule add -f -b  main git@gitlab.ambt.art:appdev/aplink/app-common-flutter.git submodules/app-common-flutter

git submodule add -f -b  main git@gitlab.ambt.art:webdev/metadao/matrix-flutter-sdk.git submodules/matrix-flutter-sdk



[submodule "submodules/aplink-im-flutter"]
	path = submodules/aplink-im-flutter
	url = git@gitlab.ambt.art:appdev/aplink/aplink-im-flutter.git
	branch = metadao_main
[submodule "submodules/aplink-app-resources"]
	path = submodules/aplink-app-resources
	url = git@gitlab.ambt.art:appdev/aplink/aplink-app-resources.git
	branch = main
[submodule "submodules/aplink-submodules"]
	path = submodules/aplink-submodules
	url = git@gitlab.ambt.art:appdev/aplink/aplink-submodules.git
	branch = metadao_merge
[submodule "submodules/app-common-flutter"]
	path = submodules/app-common-flutter
	url = git@gitlab.ambt.art:appdev/aplink/app-common-flutter.git
	branch = main
[submodule "submodules/matrix-flutter-sdk"]
	path = submodules/matrix-flutter-sdk
	url = git@gitlab.ambt.art:webdev/metadao/matrix-flutter-sdk.git
	branch = main
```
