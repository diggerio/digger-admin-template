.PHONY: install warehouse build

digger:
	mkdir -p template/app/build
	cd website && browserify -s "diggerfactory" \
		-r digger-app > template/app/build/digger.js

install:
	cd template/app/warehouse && component install

warehouse:
	cd template/app/warehouse && component build -c

build: install warehouse
	