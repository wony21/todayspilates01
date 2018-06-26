package m.todays.pilates.common;

import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;

@Alias("camelmap")
public class CamelCaseMap extends HashMap<Object, Object> {

	private String toCamelCase(String target) {
		StringBuffer buffer = new StringBuffer();
		for (String token : target.toLowerCase().split("_")) {
			buffer.append(StringUtils.capitalize(token));
		}
		return StringUtils.uncapitalize(buffer.toString());
	}
	
	public Object put(Object key, Object value) {
		return super.put(toCamelCase((String)key), value);
	}

}
