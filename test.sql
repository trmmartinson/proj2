
use rentdb;
CREATE PROCEDURE Sample1(IN lft1 INT,IN rgt1 INT, OUT emp1 VARCHAR(20))
BEGIN
    DECLARE p_emp INT;
    DECLARE cur_emp CURSOR FOR  SELECT *    FROM answers;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET noMoreRow = 0;
    OPEN cur_emp;
    LOOPROWS: LOOP

        IF noMoreRow = 0 THEN
            CLOSE cur_emp;
            LEAVE LOOPROWS;
        END IF;

        FETCH cur_emp INTO p_emp;
        SELECT p_emp;

    END LOOP;
END;;
