setup:
	cd depcore_theme_src && yarn
	pip install mkdocs mkdocs-multirepo-plugin

develop:
	npx -y concurrently \
	--names "FRONT,BACK" \
	--prefix-colors "blue,green" \
	"cd depcore_theme_src && yarn watch" \
	"sleep 6; mkdocs serve --watch ." 

build:
	cd depcore_theme_src && yarn build
	mkdocs build
preview:
	cd site && python -m http.server 8888