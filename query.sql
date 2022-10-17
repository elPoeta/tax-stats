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

DROP FUNCTION if exists tax_between_month_and_by_id;
CREATE OR REPLACE FUNCTION tax_between_month_and_by_id(id_tax_type bigint, f_date date, t_date date)
  RETURNS TABLE (id bigint,  amount float, date varchar, tax_date date, name varchar) 
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
  SELECT tax.id, tax.amount, to_char(date,'Mon-YY') as date, tax.date as tax_date, tax_type.name
   FROM tax
   inner join tax_type on tax_type.id = tax.tax_type_id 
   WHERE tax_type.id =  AND tax.date >= f_date AND tax.date < t_date order by tax.date;
END
$func$;

DROP FUNCTION if exists all_taxes_between_months_and_not_in;
CREATE OR REPLACE FUNCTION all_taxes_between_months_and_not_in(ids_tax_type bigint[], f_date date, t_date date)
  RETURNS TABLE (amount float,  mon text, tax_date date) 
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
SELECT sum(tax.amount) as total, to_char(date,'Mon-YY') as mon, tax.date
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE tax.date >= f_date AND tax.date < t_date AND tax.tax_type_id <> ALL (ids_tax_type)
group by  to_char(date,'Mon-YY'), tax.date order by tax.date;
END
$func$;

DROP FUNCTION if exists sum_all_tax_between_months;
CREATE OR REPLACE FUNCTION sum_all_tax_between_months(f_date date, t_date date)
  RETURNS TABLE ( amount float) 
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
SELECT sum(DISTINCT tax.amount) AS total
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE tax.date >= f_date AND tax.date < t_date AND tax.tax_type_id <> ALL ('{8,9}');
END
$func$;

DROP FUNCTION if exists get_taxes_by_month_and_year;
CREATE OR REPLACE FUNCTION get_taxes_by_month_and_year(year_tax int, month_tax int)
  RETURNS TABLE (tax_type_id bigint, name varchar, amount float, date date)
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
SELECT tax.tax_type_id, tax_type.name, tax.amount, tax.date
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE EXTRACT(year FROM tax.date) = year_tax AND EXTRACT(month FROM tax.date) = month_tax 
order by tax_type.name;
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

SELECT sum(tax.amount) as total, to_char(date,'Mon-YY') as date, tax.date as tax_date
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE tax.date >= '2022-01-01' AND tax.date < '2022-06-30' AND tax.tax_type_id NOT IN (8,9)
group by  to_char(date,'Mon-YY'), tax.date order by tax_date;
 
SELECT sum(DISTINCT tax.amount) AS total
FROM tax
inner join tax_type on tax_type.id = tax.tax_type_id 
WHERE tax.date >= '2022-02-01' AND tax.date < '2022-09-28' AND tax.tax_type_id <> ALL ('{8,9}');