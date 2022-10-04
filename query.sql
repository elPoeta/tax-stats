-- FUNCTIONS

-- ALL TAXES BY YEAR

DROP FUNCTION if exists all_tax_by_year;
CREATE OR REPLACE FUNCTION all_tax_by_year(year_tax int)
  RETURNS TABLE (tax_type_id bigint, name varchar, amount float) 
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
SELECT tax.tax_type_id, tax_type.name, sum(tax.amount) as amount
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE EXTRACT(year FROM tax.date) = year_tax
group by tax.tax_type_id, tax_type.name; 
END
$func$;

-- TAX BY YEAR AND TAX TYPE ID

DROP FUNCTION if exists tax_by_year_and_by_id;
CREATE OR REPLACE FUNCTION tax_by_year_and_by_id(year_tax int, id_tax_type bigint)
  RETURNS TABLE (id bigint,  amount float, date date, name varchar) 
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
   SELECT tax.id, tax.amount, tax.date, tax_type.name
   FROM tax
   inner join tax_type on tax_type.id = tax.tax_type_id 
   WHERE EXTRACT(year FROM tax.date) = year_tax  AND tax.tax_type_id = id_tax_type order by tax.date;
END
$func$;

-- TAXES BY YEAR

SELECT tax.tax_type_id, tax_type.name, sum(tax.amount) as total, to_char(date,'Mon') as mon
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE EXTRACT(year FROM tax.date) = 2022
group by tax.date, tax.tax_type_id, tax_type.name; 

SELECT tax.tax_type_id, tax_type.name, sum(tax.amount) as total
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE EXTRACT(year FROM tax.date) = 2022
group by tax.tax_type_id, tax_type.name; 

-- TAXES BETWEEN MONTHS

SELECT sum(tax.amount) as total, to_char(date,'Mon-YY') as mon
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE EXTRACT(year FROM tax.date) = 2022 AND tax.tax_type_id NOT IN (8,9)
group by  to_char(date,'Mon-YY'); 

SELECT sum(tax.amount) as total, to_char(date,'Mon-YY') as mon
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE tax.date BETWEEN '2022-01-01' AND '2022-08-31' AND tax.tax_type_id NOT IN (8,9)
group by  to_char(date,'Mon-YY'); 



 