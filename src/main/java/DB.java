
import com.heroku.sdk.jdbc.DatabaseUrl;
import java.net.URISyntaxException;
import org.sql2o.Sql2o;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Bunto
 */
public final class DB {
    private static DB instance;
    private static Sql2o sql2o;
    
    public static DB getInstance() throws URISyntaxException {
        if (instance == null) {
            instance = new DB();
            sql2o = new Sql2o(DatabaseUrl.extract().jdbcUrl(), DatabaseUrl.extract().username(), DatabaseUrl.extract().password());
        }
        return instance;
    }
    
    public Sql2o getSql2o() {
        return sql2o;
    }
}
