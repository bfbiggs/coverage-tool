This is a simple tool to help identify where coverage differs between two coverage-summary files. The intention would be to use this tool in combination with the lcov index file to help analyze changes in coverage when necessary.

Typical steps:

1) Download coverage artifact from CI pipeline and decompress
2) Decompress the nested ./coverage directory
3) Copy and paste the contents of the coverage directory into one of the following directories:
   1) ./coverage-report-baseline
   2) ./coverage-report-pr
4) `pnpm i`
5) Run `pnpm compare`
6) Script will open the two lcov reports if copied and pasted correctly, log the results, and open a third site with the same info as the log.