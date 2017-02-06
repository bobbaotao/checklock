MOCHA = ./node_modules/mocha/bin/_mocha
ISTANBUL = ./node_modules/.bin/istanbul
MOCHA_OPTS = --timeout 20000 --reporter spec
TESTS_ALL = test/test.*.js
MOCHAWESOME_OPTS = --timeout 20000 --reporter mochawesome

test:
	@echo "Testing..."
	@$(MOCHA) $(MOCHA_OPTS) $(TESTS_ALL)
test-awesome-report:
	@echo "Testing..."
	@$(MOCHA) $(MOCHAWESOME_OPTS) $(TESTS_ALL)
test-cov:
	@echo "Testing..."
	@$(ISTANBUL) cover -- $(MOCHA) $(MOCHAWESOME_OPTS) $(TESTS_ALL)

.PHONY: test test-awesome-report test-cov
