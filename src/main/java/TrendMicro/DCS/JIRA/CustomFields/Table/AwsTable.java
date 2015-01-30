package TrendMicro.DCS.JIRA.CustomFields.Table;

import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.customfields.impl.AbstractCustomFieldType;
import com.atlassian.jira.issue.customfields.impl.AbstractSingleFieldType;
import com.atlassian.jira.issue.customfields.impl.FieldValidationException;
import com.atlassian.jira.issue.customfields.view.CustomFieldParams;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.config.FieldConfig;
import com.atlassian.jira.issue.fields.layout.field.FieldLayoutItem;
import com.atlassian.jira.plugin.webresource.JiraWebResourceManager;
import com.atlassian.jira.util.ErrorCollection;
import com.atlassian.jira.issue.customfields.persistence.CustomFieldValuePersister;
import com.atlassian.jira.issue.customfields.persistence.PersistenceFieldType;
import com.atlassian.jira.issue.customfields.manager.GenericConfigManager;
import com.atlassian.plugin.webresource.WebResourceManager;
import com.atlassian.jira.component.ComponentAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class AwsTable extends AbstractSingleFieldType<String> {

	private static final Logger log = LoggerFactory.getLogger(AwsTable.class);
	private final WebResourceManager webResourceManager;
	
    public AwsTable(WebResourceManager webResourceManager, CustomFieldValuePersister customFieldValuePersister, GenericConfigManager genericConfigManager) {
    	super(customFieldValuePersister,genericConfigManager);
    	this.webResourceManager = webResourceManager;
    }
    
	@Override
	public String getSingularObjectFromString(final String stringObject)
			throws FieldValidationException {
		// TODO Auto-generated method stub
		return stringObject;
	}

	@Override
	public String getStringFromSingularObject(final String singularObject) {
		// TODO Auto-generated method stub
		return singularObject;
	}
/*	
	public Map getVelocityParameters(Issue issue, CustomField field, FieldLayoutItem fieldLayoutItem)
    {
        Map map = super.getVelocityParameters(issue, field, fieldLayoutItem);

        final WebResourceManager webResourceManager = ComponentAccessor.getWebResourceManager();
        webResourceManager.requireResource("jira.webresources:jira-global");
        webResourceManager.requireResource("org.hakanai.jira.plugins.jira-order-plugin:draggable");
        return map;
    }
	*/
	@Override
	protected PersistenceFieldType getDatabaseType() {
		// TODO Auto-generated method stub
		return PersistenceFieldType.TYPE_UNLIMITED_TEXT;
	}

	@Override
	protected Object getDbValueFromObject(final String customfieldObject) {
		// TODO Auto-generated method stub
		return getStringFromSingularObject(customfieldObject);
	}

	@Override
	protected String getObjectFromDbValue(final Object dbValue)
			throws FieldValidationException {
		// TODO Auto-generated method stub
		return getSingularObjectFromString((String) dbValue);
	}

	
}
