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