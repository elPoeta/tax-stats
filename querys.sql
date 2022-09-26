-- select to_char(date,'Mon') as mon,
--        extract(year from date) as yyyy,
--        sum("amount") as "amount"
-- from tax
-- group by 1,2;


-- SELECT id, amount, date FROM tax 
-- WHERE EXTRACT(MONTH FROM date) = 10;

-- SELECT "tax".id, "tax".amount, "tax".date, "taxType".name
-- FROM "tax"
-- inner join "taxType" on "taxType".id = "tax"."taxTypeId" 
-- WHERE EXTRACT(MONTH FROM public."tax".date) = 9;

-- SELECT "tax".id, "tax".amount, "tax".date, "taxType".name
-- FROM "tax"
-- inner join "taxType" on "taxType".id = "tax"."taxTypeId" 
-- WHERE EXTRACT(year FROM public."tax".date) = 2022 AND "tax"."taxTypeId" = 3;

-- DROP FUNCTION if exists all_tax_by_year;
-- CREATE OR REPLACE FUNCTION all_tax_by_year(year_tax int)
--   RETURNS TABLE (tax_type_id bigint, name varchar, total float) 
--   LANGUAGE plpgsql AS
-- $func$
-- BEGIN
--    RETURN QUERY
-- SELECT tax."taxTypeId", "taxType".name, sum(tax.amount) as amount
-- FROM "tax"
-- inner join "taxType" on "taxType".id = "tax"."taxTypeId" 
-- WHERE EXTRACT(year FROM public."tax".date) = year_tax
-- group by tax."taxTypeId", "taxType".name; 

-- END
-- $func$;

-- DROP FUNCTION if exists tax_by_year_and_by_id;
-- CREATE OR REPLACE FUNCTION tax_by_year_and_by_id(year_tax int, tax_type_id bigint)
--   RETURNS TABLE (id bigint,  amount float, date date, name varchar) 
--   LANGUAGE plpgsql AS
-- $func$
-- BEGIN
--    RETURN QUERY
--    SELECT "tax".id, "tax".amount, "tax".date, "taxType".name
--    FROM "tax"
--    inner join "taxType" on "taxType".id = "tax"."taxTypeId" 
--    WHERE EXTRACT(year FROM public."tax".date) = year_tax  AND "tax"."taxTypeId" = tax_type_id order by tax.date;
-- END
-- $func$;
