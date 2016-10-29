#Markdown 语法
>## Author: cyl    2016.10.29 
<a href ="http://www.appinn.com/markdown/">更多</a>
###Markdown 和 HTML
Markdown语法种类少的一种书写格式。兼容HTML。
>一些HTML区块元素前后加上空行，开始标签和结尾标签不能用制表符Tab或空格来缩进，行内标签可以在MD的段落、列表或是标题里随意使用。
<table>
    <tr>
        <td>Markdown支持HTML语法，但在HTML内部，MD语法失效，如*强调*失效</td>
    </tr>
</table>
###特殊字符自动转换

在 HTML中实体形式的<span> < （区块引用 Blockquotes起始标签）和 & （HTML实体标签）</span>，转化成 <span>&lt; 和 &amp;</span> ----看源文档
>http://images.google.com/images?num=30&q=larry+bird
http://images.google.com/images?num=30&amp;q=larry+bird

###区块嵌套
>
>>区块嵌套
>###嵌套标题
>>嵌套内容

###列表
无序列表用星号、加号或是减号作为列表标记
>* 星号
+ 加号
- 减号

有序列表用任意数字接着一个英文句点
>5.  有序列表
3.  数字

1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.

><pre>
><p>Here is an example of AppleScript
在代码区块里面， & 、 < 和 > 会自动转成 HTML 实体


*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.


###分隔线
***
---
This is [链接](http://example.com/ "Title") inline link.
>试一下*强调*<em>强调</em>
>再试一下 **强调** <strong>强调</strong>

`<html><head></head><body></body></html>`
<code>html</code>