import { Liquid } from "liquidjs";
import { minify } from "html-minifier-terser";
import path from "path";

interface RenderTemplateProps {
  user: string;
  template: string;
  data: {
    [key: string]: any;
  };
}

// Register a new liquid engine
const engine = new Liquid({
  root: path.resolve(__dirname, "../../email-templates"),
  cache: false,
  extname: ".liquid",
  strictVariables: false,
  strictFilters: false,
});

const renderTemplate = async (props: RenderTemplateProps) => {
  // register custom filters

  // render template with data
  let markup = await engine.renderFile(
    `${props.user}_${props.template}.liquid`,
    props.data
  );
  // minify the markup
  markup = await minify(markup, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
  });
  return markup;
};
export default renderTemplate;
