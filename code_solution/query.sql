
SELECT *
FROM company.employee
WHERE TIMESTAMPDIFF(day, hire_date, curdate()) IN (30, 31);

-- Above Query Fails because it doesn't consider:
-- 1. The actual length of months (28, 30, or 31 days).
-- 2. Exact date ranges that cross month boundaries.
-- The below query works for the above cases.

SELECT *
FROM company.employee
WHERE hire_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH);
